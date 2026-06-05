"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, Pause, ArrowLeft, Keyboard } from "lucide-react";

// ─── Passage ───────────────────────────────────────────────────────────────────
const PASSAGE =
    "I build digital experiences where motion and typography work as one system. Every transition is deliberate, every spacing decision intentional. The goal is always the same: make the interface feel alive without ever feeling loud.";

const AUTO_WPM = 80;
const AUTO_CPM = AUTO_WPM * 5;
const CHAR_INTERVAL_MS = 60000 / AUTO_CPM;

// ─── Keyboard rows ─────────────────────────────────────────────────────────────
const ROWS = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
];

type Phase = "intro" | "arena" | "result";
interface WpmPoint { t: number; wpm: number }

// ─── Shared card padding — no fixed height, content sizes naturally ───────────
const CARD_CLS = "flex flex-col px-6 py-6 md:px-10 md:py-8";

// ─── Keyboard ──────────────────────────────────────────────────────────────────
function KeyboardDisplay({ activeKey }: { activeKey: string }) {
    const key = (k: string, wide?: string) => {
        const isActive = activeKey.toUpperCase() === k || (k === "SHIFT" && activeKey === "Shift");
        return (
            <motion.div
                key={k}
                animate={isActive ? { scale: 0.88, y: 2 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.08 }}
                className={`flex items-center justify-center rounded-lg border text-[10px] font-semibold uppercase tracking-wide transition-colors duration-100 h-8 ${wide ?? "w-8"}
                    ${isActive
                        ? "border-[#c9a84c] bg-[#c9a84c]/20 text-[#7a6030] shadow-[0_0_8px_rgba(201,168,76,0.35)]"
                        : "border-[#d4c9b8] bg-[#ede8e0] text-[#8a7a65]"}`}
            >
                {k === "SHIFT" ? "⇧" : k}
            </motion.div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-1.5 select-none">
            {/* Row 0 */}
            <div className="flex gap-1.5">{ROWS[0].map((k) => key(k))}</div>
            {/* Row 1 */}
            <div className="flex gap-1.5">{ROWS[1].map((k) => key(k))}</div>
            {/* Row 2 — Shift on both sides */}
            <div className="flex gap-1.5">
                {key("SHIFT", "w-14")}
                {ROWS[2].map((k) => key(k))}
                {key("SHIFT", "w-14")}
            </div>
            {/* Space bar */}
            <div className="flex gap-1.5 mt-0.5">
                <motion.div
                    animate={activeKey === " " ? { scale: 0.96, y: 2 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.08 }}
                    className={`flex h-8 w-52 items-center justify-center rounded-lg border text-[9px] font-medium uppercase tracking-[0.3em] transition-colors duration-100
                        ${activeKey === " "
                            ? "border-[#c9a84c] bg-[#c9a84c]/20 text-[#7a6030]"
                            : "border-[#d4c9b8] bg-[#ede8e0] text-[#8a7a65]"}`}
                >
                    space
                </motion.div>
            </div>
        </div>
    );
}

// ─── WPM sparkline ─────────────────────────────────────────────────────────────
function WpmGraph({ points }: { points: WpmPoint[] }) {
    if (points.length < 2) return null;
    const W = 320, H = 80;
    const maxWpm = Math.max(...points.map((p) => p.wpm), 1);
    const maxT   = Math.max(...points.map((p) => p.t), 1);
    const toX = (t: number) => (t / maxT) * W;
    const toY = (w: number) => H - (w / maxWpm) * H;
    const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.t).toFixed(1)},${toY(p.wpm).toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={`${d} L${toX(maxT).toFixed(1)},${H} L0,${H} Z`} fill="url(#wpmGrad)" />
            <path d={d} fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function TypingChallenge() {
    const [phase, setPhase]         = useState<Phase>("intro");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [running, setRunning]     = useState(false);
    const [paused, setPaused]       = useState(false);

    const [userInput, setUserInput] = useState("");
    const [autoPos, setAutoPos]     = useState(0);
    const [activeKey, setActiveKey] = useState("");

    const [userWpm, setUserWpm]         = useState(0);
    const [wpmHistory, setWpmHistory]   = useState<WpmPoint[]>([]);
    const [startTime, setStartTime]     = useState<number | null>(null);
    const [pausedAt, setPausedAt]       = useState<number | null>(null);
    const [totalPaused, setTotalPaused] = useState(0);
    const [finished, setFinished]       = useState(false);

    const inputRef  = useRef<HTMLInputElement>(null);
    const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const wpmTimer  = useRef<ReturnType<typeof setInterval> | null>(null);
    const keyFlash  = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── helpers ──────────────────────────────────────────────────────────────
    const clearTimers = useCallback(() => {
        if (autoTimer.current) clearInterval(autoTimer.current);
        if (wpmTimer.current)  clearInterval(wpmTimer.current);
        if (keyFlash.current)  clearTimeout(keyFlash.current);
    }, []);

    const resetState = useCallback(() => {
        clearTimers();
        setUserInput(""); setAutoPos(0); setActiveKey("");
        setUserWpm(0); setWpmHistory([]); setStartTime(null);
        setRunning(false); setPaused(false); setFinished(false);
        setCountdown(null); setPausedAt(null); setTotalPaused(0);
    }, [clearTimers]);

    const startCountdown = useCallback(() => {
        resetState();
        setPhase("arena");
        setCountdown(3);
    }, [resetState]);

    // ── pause / resume ────────────────────────────────────────────────────────
    const togglePause = useCallback(() => {
        if (!running && !paused) return;
        if (paused) {
            // resume — restart both timers
            const resumeAt = Date.now();
            const gap = pausedAt ? resumeAt - pausedAt : 0;
            setTotalPaused((p) => p + gap);
            setPausedAt(null);
            setPaused(false);
            setRunning(true);

            // restart auto-typer from current autoPos
            let pos = autoPos;
            autoTimer.current = setInterval(() => {
                pos++;
                setAutoPos(pos);
                if (pos >= PASSAGE.length) clearInterval(autoTimer.current!);
            }, CHAR_INTERVAL_MS);

            // restart wpm sampler
            wpmTimer.current = setInterval(() => {
                setUserInput((cur) => {
                    if (startTime) {
                        const elapsed = (Date.now() - resumeAt + (startTime ? resumeAt - startTime : 0)) / 60000;
                        if (elapsed > 0) {
                            const wpm = Math.round(cur.length / 5 / elapsed);
                            setUserWpm(wpm);
                            setWpmHistory((h) => [...h, { t: Date.now() - (startTime ?? 0), wpm }]);
                        }
                    }
                    return cur;
                });
            }, 2000);

            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            // pause — stop timers
            clearTimers();
            setPausedAt(Date.now());
            setPaused(true);
            setRunning(false);
        }
    }, [running, paused, pausedAt, autoPos, startTime, clearTimers]);

    // ── countdown → race ─────────────────────────────────────────────────────
    useEffect(() => {
        if (countdown === null) return;
        if (countdown === 0) {
            setCountdown(null);
            setRunning(true);
            const t0 = Date.now();
            setStartTime(t0);

            let pos = 0;
            autoTimer.current = setInterval(() => {
                pos++;
                setAutoPos(pos);
                if (pos >= PASSAGE.length) clearInterval(autoTimer.current!);
            }, CHAR_INTERVAL_MS);

            wpmTimer.current = setInterval(() => {
                setUserInput((cur) => {
                    const elapsed = (Date.now() - t0) / 60000;
                    if (elapsed > 0) {
                        const wpm = Math.round(cur.length / 5 / elapsed);
                        setUserWpm(wpm);
                        setWpmHistory((h) => [...h, { t: Date.now() - t0, wpm }]);
                    }
                    return cur;
                });
            }, 2000);

            setTimeout(() => inputRef.current?.focus(), 50);
            return;
        }
        const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    // ── keyboard input ────────────────────────────────────────────────────────
    const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!running || finished) return;
        if (keyFlash.current) clearTimeout(keyFlash.current);
        setActiveKey(e.key === " " ? " " : e.key);
        keyFlash.current = setTimeout(() => setActiveKey(""), 120);
    }, [running, finished]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!running || finished) return;
        const val = e.target.value;
        if (val.length > PASSAGE.length) return;
        setUserInput(val);

        if (startTime) {
            const elapsed = (Date.now() - startTime - totalPaused) / 60000;
            if (elapsed > 0) setUserWpm(Math.round(val.length / 5 / elapsed));
        }

        if (val.length === PASSAGE.length) {
            clearTimers();
            setRunning(false);
            setFinished(true);
            if (startTime) {
                const elapsed = (Date.now() - startTime - totalPaused) / 60000;
                const finalWpm = Math.round(val.length / 5 / elapsed);
                setUserWpm(finalWpm);
                setWpmHistory((h) => [...h, { t: Date.now() - startTime, wpm: finalWpm }]);
            }
            setTimeout(() => setPhase("result"), 600);
        }
    }, [running, finished, startTime, totalPaused, clearTimers]);

    // auto-finish when auto-typer wins
    useEffect(() => {
        if (autoPos >= PASSAGE.length && running && !finished) {
            clearTimers();
            setRunning(false);
            setFinished(true);
            setTimeout(() => setPhase("result"), 600);
        }
    }, [autoPos, running, finished, clearTimers]);

    useEffect(() => () => clearTimers(), [clearTimers]);

    // ── derived ───────────────────────────────────────────────────────────────
    const accuracy = userInput.length === 0 ? 100 : Math.round(
        (userInput.split("").filter((c, i) => c === PASSAGE[i]).length / userInput.length) * 100
    );
    const userAhead = userInput.length > autoPos;

    // ── passage character coloring ────────────────────────────────────────────
    // Text-only coloring — no background fills. Clean, readable, intuitive.
    //
    //  correct (user typed right)  →  site near-black  #1a1612  — "done, confident"
    //  wrong   (user typed wrong)  →  warm red         #c0392b  — clear error signal
    //  auto-ahead (auto past user) →  site gold        #c9a84c  — "auto is here"
    //  pending                     →  warm muted grey  #b8b0a6  — not yet reached
    //
    // The cursor is a gold underline on the current character, not a separate bar.
    const charColor = (i: number): string => {
        const userHere = i < userInput.length;
        const autoHere = i < autoPos;

        if (userHere) {
            return userInput[i] === PASSAGE[i]
                ? "text-[#1a1612]"          // correct
                : "text-[#c0392b]";         // wrong
        }
        if (autoHere) {
            return "text-[#c9a84c]";        // auto has typed this, user hasn't yet
        }
        return "text-[#b8b0a6]";            // pending
    };

    // ── render ────────────────────────────────────────────────────────────────
    return (
        <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#d4c9b8] bg-[#ede8e0]">
                <AnimatePresence mode="wait">

                    {/* ── INTRO ─────────────────────────────────────────────── */}
                    {phase === "intro" && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className={`${CARD_CLS} items-center justify-center text-center`}
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c9a84c]/40 bg-[#c9a84c]/10"
                            >
                                <Keyboard className="h-7 w-7 text-[#c9a84c]" />
                            </motion.div>
                            <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[#8a7a65]">Interactive Demo</p>
                            <h3 className="text-3xl font-semibold tracking-tight text-[#1a1612] md:text-4xl">
                                Let&apos;s have a typing challenge!
                            </h3>
                            <p className="mt-4 max-w-md text-sm leading-7 text-[#5a5045]">
                                Race against my 80 WPM auto-typer. See how your speed and accuracy stack up — live, letter by letter.
                            </p>
                            <motion.button
                                onClick={startCountdown}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/12 px-7 py-3.5 text-sm font-medium text-[#5a4a2a] transition-colors hover:bg-[#c9a84c]/22"
                            >
                                <Play className="h-4 w-4" /> Let&apos;s do it
                            </motion.button>
                        </motion.div>
                    )}

                    {/* ── ARENA ─────────────────────────────────────────────── */}
                    {phase === "arena" && (
                        <motion.div
                            key="arena"
                            initial={{ opacity: 0, filter: "blur(12px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(12px)" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className={CARD_CLS}
                        >
                            {/* Top bar */}
                            <div className="mb-4 flex items-center justify-between">
                                <button
                                    onClick={() => { resetState(); setPhase("intro"); }}
                                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#8a7a65] hover:text-[#c9a84c] transition-colors"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                                </button>

                                <div className="flex items-center gap-4">
                                    {/* WPM badges */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#8a7a65]">You</span>
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${userAhead ? "bg-[#1a1612]/10 text-[#1a1612]" : "bg-[#d4c9b8]/60 text-[#5a5045]"}`}>
                                            {userWpm} WPM
                                        </span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-[#d4c9b8]" />
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#8a7a65]">Auto</span>
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${!userAhead ? "bg-[#c9a84c]/25 text-[#7a6030]" : "bg-[#d4c9b8]/60 text-[#5a5045]"}`}>
                                            {AUTO_WPM} WPM
                                        </span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-[#d4c9b8]" />
                                    {/* Pause / Resume */}
                                    <button
                                        onClick={togglePause}
                                        disabled={!!countdown || finished}
                                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.35em] text-[#8a7a65] hover:text-[#c9a84c] transition-colors disabled:opacity-30"
                                    >
                                        {paused ? <><Play className="h-3 w-3" /> Resume</> : <><Pause className="h-3 w-3" /> Pause</>}
                                    </button>
                                    <div className="h-3 w-[1px] bg-[#d4c9b8]" />
                                    <button
                                        onClick={startCountdown}
                                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.35em] text-[#8a7a65] hover:text-[#c9a84c] transition-colors"
                                    >
                                        <RotateCcw className="h-3 w-3" /> Restart
                                    </button>
                                </div>
                            </div>

                            {/* Progress bars */}
                            <div className="mb-4 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 text-right text-[9px] uppercase tracking-[0.3em] text-[#8a7a65]">You</span>
                                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#d4c9b8]/60">
                                        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[#1a1612]"
                                            style={{ width: `${(userInput.length / PASSAGE.length) * 100}%` }} transition={{ duration: 0.1 }} />
                                    </div>
                                    <span className="w-8 text-[9px] tabular-nums text-[#8a7a65]">{Math.round((userInput.length / PASSAGE.length) * 100)}%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-8 text-right text-[9px] uppercase tracking-[0.3em] text-[#8a7a65]">Auto</span>
                                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#d4c9b8]/60">
                                        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[#c9a84c]"
                                            style={{ width: `${(autoPos / PASSAGE.length) * 100}%` }} transition={{ duration: 0.1 }} />
                                    </div>
                                    <span className="w-8 text-[9px] tabular-nums text-[#8a7a65]">{Math.round((autoPos / PASSAGE.length) * 100)}%</span>
                                </div>
                            </div>

                            {/* Passage */}
                            <div className="relative mb-4 rounded-xl border border-[#d4c9b8] bg-[#f6f3ee] p-5 font-mono text-sm leading-9 tracking-wide">
                                {PASSAGE.split("").map((ch, i) => {
                                    const isCursor = i === userInput.length && running && !paused;
                                    const isWrong  = i < userInput.length && userInput[i] !== PASSAGE[i];
                                    return (
                                        <span
                                            key={i}
                                            className={`
                                                relative transition-colors duration-75
                                                ${charColor(i)}
                                                ${isCursor ? "border-b-2 border-[#c9a84c]" : ""}
                                                ${isWrong  ? "underline decoration-[#c0392b]/40 decoration-wavy underline-offset-2" : ""}
                                            `}
                                        >
                                            {ch}
                                        </span>
                                    );
                                })}

                                {/* Countdown overlay */}
                                <AnimatePresence>
                                    {countdown !== null && (
                                        <motion.div
                                            key={countdown}
                                            initial={{ opacity: 0, scale: 1.4 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7 }}
                                            transition={{ duration: 0.35 }}
                                            className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#f6f3ee]/90 backdrop-blur-sm"
                                        >
                                            <span className="text-6xl font-black tracking-[-0.08em] text-[#c9a84c]">
                                                {countdown === 0 ? "GO" : countdown}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Paused overlay */}
                                <AnimatePresence>
                                    {paused && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#f6f3ee]/85 backdrop-blur-sm"
                                        >
                                            <div className="text-center">
                                                <Pause className="mx-auto h-8 w-8 text-[#c9a84c]" />
                                                <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-[#8a7a65]">Paused</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Hidden input — always focused via click on passage area */}
                            <input
                                ref={inputRef}
                                value={userInput}
                                onChange={handleChange}
                                onKeyDown={handleKey}
                                disabled={!running}
                                className="sr-only"
                                aria-label="Type here"
                                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                            />

                            {/* Keyboard */}
                            <div className="flex justify-center pt-4">
                                <KeyboardDisplay activeKey={activeKey} />
                            </div>
                        </motion.div>
                    )}

                    {/* ── RESULT ────────────────────────────────────────────── */}
                    {phase === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`${CARD_CLS} relative overflow-hidden`}
                        >
                            {/* ── Watermark graph — full-bleed behind all content ── */}
                            {wpmHistory.length >= 2 && (
                                <div className="pointer-events-none absolute inset-0 z-0">
                                    <svg
                                        viewBox="0 0 320 80"
                                        className="h-full w-full"
                                        preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.10" />
                                                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.03" />
                                            </linearGradient>
                                        </defs>
                                        {(() => {
                                            const pts = wpmHistory;
                                            const W = 320, H = 80;
                                            const maxWpm = Math.max(...pts.map(p => p.wpm), 1);
                                            const maxT   = Math.max(...pts.map(p => p.t), 1);
                                            const toX = (t: number) => (t / maxT) * W;
                                            const toY = (w: number) => H - (w / maxWpm) * H;
                                            const d = pts.map((p, i) =>
                                                `${i === 0 ? "M" : "L"}${toX(p.t).toFixed(1)},${toY(p.wpm).toFixed(1)}`
                                            ).join(" ");
                                            return (
                                                <>
                                                    <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#bgGrad)" />
                                                    <path d={d} fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </>
                                            );
                                        })()}
                                    </svg>
                                </div>
                            )}

                            {/* All result content sits above the watermark */}
                            <div className="relative z-10">
                                {/* Header row */}
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#8a7a65]">Results</p>
                                    <button
                                        onClick={() => { resetState(); setPhase("intro"); }}
                                        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#8a7a65] hover:text-[#c9a84c] transition-colors"
                                    >
                                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                                    </button>
                                </div>

                                {/* Stat cards */}
                                <div className="mb-4 grid grid-cols-3 gap-3">
                                    {[
                                        { label: "Your WPM", value: userWpm,  unit: "wpm", hi: userWpm >= AUTO_WPM },
                                        { label: "Auto WPM", value: AUTO_WPM, unit: "wpm", hi: AUTO_WPM > userWpm },
                                        { label: "Accuracy", value: accuracy, unit: "%",   hi: accuracy >= 95 },
                                    ].map((s) => (
                                        <div key={s.label} className={`rounded-xl border px-4 py-3 flex items-center gap-4 backdrop-blur-[2px] ${s.hi ? "border-[#c9a84c]/50 bg-[#c9a84c]/15" : "border-[#d4c9b8] bg-[#e6dfd4]/80"}`}>
                                            <p className={`text-3xl font-black tabular-nums tracking-tight leading-none ${s.hi ? "text-[#7a6030]" : "text-[#1a1612]"}`}>
                                                {s.value}<span className="ml-0.5 text-[11px] font-medium tracking-[0.2em] text-[#8a7a65]">{s.unit}</span>
                                            </p>
                                            <p className="text-[9px] uppercase tracking-[0.35em] text-[#8a7a65] leading-tight">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Outcome */}
                                <div className="mb-4 rounded-xl border border-[#d4c9b8] bg-[#f6f3ee]/80 px-5 py-3 backdrop-blur-[2px]">
                                    <p className="text-sm font-medium text-[#1a1612]">
                                        {userWpm >= AUTO_WPM
                                            ? "🏆 You beat the auto-typer! Impressive speed."
                                            : userWpm >= AUTO_WPM * 0.8
                                            ? "⚡ Close race — you're nearly at 80 WPM."
                                            : "Keep practising — speed comes with consistency."}
                                    </p>
                                </div>

                                {/* Try again */}
                                <div className="flex justify-center pt-2">
                                    <motion.button
                                        onClick={startCountdown}
                                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        className="inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/12 px-7 py-3.5 text-sm font-medium text-[#5a4a2a] backdrop-blur-[2px] transition-colors hover:bg-[#c9a84c]/22"
                                    >
                                        <RotateCcw className="h-4 w-4" /> Try again
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
