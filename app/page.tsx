"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useAnimation,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    ChevronDown,
    Code2,
    Film,
    Layers3,
    Mail,
    Menu,
    MoveUpRight,
    Sparkles,
    Zap,
} from "lucide-react";
import WordReveal from "./components/WordReveal";
import ShapeDivider from "./components/ShapeDivider";
import MorphShape from "./components/MorphShape";
import HorizontalGallery from "./components/HorizontalGallery";
import TypingChallenge from "./components/TypingChallenge";
import BlurText from "./components/BlurText";
import LogoLoop from "./components/LogoLoop";
import Image from "next/image";

const projects = [
    {
        title: "Personal Branding",
        type: "Project-01",
        impact: [
            "Stronger First Impression",
            "Clearer Personal Positioning",
            "More Memorable Online Presence",
        ],
        tag: "Selected Work 01",
        accent: "from-white/18 via-white/8 to-transparent",
        src: "/Work-01.png",
        url: "https://md-rakib-hsn.vercel.app/",
    },
    {
        title: "Corporate Identity",
        type: "Project-02",
        impact: [
            "Greater Brand Trust",
            "Sharper Business Perception",
            "More Professional Digital Presence",
        ],
        tag: "Selected Work 02",
        accent: "from-white/12 via-white/6 to-transparent",
        src: "/Work-02.png",
        url: "https://s-r-ad.vercel.app/",
    },
    {
        title: "Creative Showcase",
        type: "Project-03",
        impact: [
            "Higher Visual Engagement",
            "Stronger Creative Recall",
            "More Compelling Project Presentation",
        ],
        tag: "Selected Work 03",
        accent: "from-white/16 via-white/7 to-transparent",
        src: "/Work-03.png",
        url: null,
    },
];

const stack = [
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Lenis",
    "React",
    "Motion Systems",
    "SEO",
];

const timeline = [
    {
        id: "01",
        title: "Get",
        text: "Gathering resources is half the work done.",
    },
    {
        id: "02",
        title: "Set",
        text: "Use resources within a trusted and efficient workflow.",
    },
    {
        id: "03",
        title: "Sleep",
        text: "Trust the process. Watch it pay off.",
    },
];

function useReducedMotionSafe() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(mq.matches);
        onChange();
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);
    return reduced;
}

function splitText(text: string) {
    return text.split("").map((char, i) => (
        <motion.span
            key={`${char}-${i}`}
            initial={{ y: 90, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.018 }}
            className="inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    ));
}

function MagneticButton({
    children,
    href = "#contact",
}: {
    children: React.ReactNode;
    href?: string;
}) {
    const ref = useRef<HTMLAnchorElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.2 });
    const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.2 });

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={(e) => {
                const rect = ref.current?.getBoundingClientRect();
                if (!rect) return;
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                x.set(dx * 0.18);
                y.set(dy * 0.18);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium backdrop-blur-md transition-colors border-[#c9a84c]/40 bg-[#c9a84c]/8 text-[#5a4a2a] hover:bg-[#c9a84c]/15"
        >
            <span>{children}</span>
            <MoveUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
    );
}

function SectionTitle({
    eyebrow,
    title,
    copy,
}: {
    eyebrow: string;
    title: string;
    copy: string;
}) {
    return (
        <div className="mx-auto mb-10 max-w-4xl px-4 text-center sm:px-6 md:px-10">
            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7 }}
                    className="mb-4 text-[10px] uppercase tracking-[0.48em] text-[#8a7a65]"
                >
                    {eyebrow}
                </motion.p>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl text-[#111111]"
            >
                {title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.12 }}
                className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a5045] md:text-base"
            >
                {copy}
            </motion.p>
        </div>
    );
}

function NoiseOverlay() {
    return (
        <div
            className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "3px 3px, 3px 3px",
            }}
        />
    );
}

function CursorGlow() {
    const [ready, setReady] = useState(false);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const glowX = useTransform(mx, (v) => v - 220);
    const glowY = useTransform(my, (v) => v - 220);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
            if (!ready) setReady(true);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [mx, my, ready]);

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full blur-3xl md:block"
            style={{
                x: glowX,
                y: glowY,
                opacity: ready ? 0.55 : 0,
                background: "radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.06) 60%, transparent 100%)",
            }}
        />
    );
}

/* ─── Inline logo SVG — uses currentColor so it inherits text colour ─────── */
function NavLogo() {
    return (
        <a href="#" aria-label="Sajib Ahmed — home" className="flex items-center">
            {/* viewBox trimmed to the actual artwork bounds */}
            <svg
                viewBox="320 175 275 130"
                className="h-5 w-auto sm:h-6"
                aria-hidden="true"
                style={{ fill: "currentColor", stroke: "currentColor" }}
            >
                <rect x="350.479" y="180.63" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                <rect x="350.479" y="223.189" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                <rect x="334.203" y="265.749" width="128.605" height="35.616" rx="8.49" ry="8.49" strokeMiterlimit="10" strokeWidth=".943" />
                <rect x="326.803" y="201.91" width="78.176" height="35.616" rx="6.619" ry="6.619" transform="translate(146.172 585.608) rotate(-90)" strokeMiterlimit="10" strokeWidth=".735" />
                <rect x="473.233" y="180.63" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                <rect x="508.849" y="235.927" width="41.096" height="18.767" strokeMiterlimit="10" strokeWidth=".387" />
                <rect x="430.674" y="223.189" width="120.735" height="35.616" rx="8.226" ry="8.226" transform="translate(250.044 732.039) rotate(-90)" strokeMiterlimit="10" strokeWidth=".914" />
                <rect x="507.386" y="223.189" width="120.735" height="35.616" rx="8.226" ry="8.226" transform="translate(326.756 808.751) rotate(-90)" strokeMiterlimit="10" strokeWidth=".914" />
                <rect x="405.912" y="244.469" width="78.176" height="35.616" rx="6.619" ry="6.619" transform="translate(182.723 707.277) rotate(-90)" strokeMiterlimit="10" strokeWidth=".735" />
            </svg>
        </a>
    );
}

function FloatingNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navItems = ["Works", "Archive", "Stack", "Contact"];

    // Shared nav link style — Inter, #111111, weight 700, uppercase
    const linkCls = "font-sans font-bold uppercase text-[#111111] hover:text-[#c9a84c] transition-colors duration-300";

    return (
        <>
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8"
        >
            <div className="mx-auto max-w-7xl">
                {/* Glossy translucent pill — all viewports */}
                <div className="flex items-center justify-between rounded-full border px-5 py-3.5
                    border-white/30 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                    backdrop-blur-2xl backdrop-saturate-150">
                    <span className="text-[#111111]"><NavLogo /></span>

                    {/* Desktop links */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`${linkCls} text-[13px] tracking-[0.08em]`}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Hamburger — both bars sit at the exact vertical center,
                        rotate only — no y translation, guaranteed perfect ✕ */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden border-[#111111]/20 text-[#111111] hover:bg-[#111111]/5 ${menuOpen ? "z-[60]" : "z-auto"}`}
                    >
                        <span className="relative block h-[8px] w-[22px]">
                            {/* Bar 1 — top */}
                            <motion.span
                                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originX: "50%", originY: "50%", top: 0, position: "absolute", left: 0, right: 0 }}
                                className="block h-[1.5px] rounded-full bg-current"
                            />
                            {/* Bar 2 — bottom */}
                            <motion.span
                                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originX: "50%", originY: "50%", top: 8, position: "absolute", left: 0, right: 0 }}
                                className="block h-[1.5px] rounded-full bg-current"
                            />
                        </span>
                    </button>
                </div>
            </div>
        </motion.header>

        {/* ── Mobile overlay — no card, links float over blurred backdrop ── */}
        <AnimatePresence>
            {menuOpen && (
                <>
                    {/* Full-screen blur backdrop — tap to close */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-40 backdrop-blur-md bg-[#f6f3ee]/60 md:hidden"
                    />

                    {/* Links — right-aligned, vertically centered */}
                    <motion.nav
                        key="links"
                        className="fixed inset-0 z-50 flex flex-col items-end justify-center gap-2 pr-8 md:hidden pointer-events-none"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 12 }}
                                transition={{ duration: 0.28, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                className={`${linkCls} pointer-events-auto px-2 py-3 text-2xl tracking-[0.04em]`}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
        </>
    );
}

function BootSequence({ done }: { done: boolean }) {
    const exitEase = [0.76, 0, 0.24, 1] as const;

    return (
        <motion.div
            initial={{ y: "0%", opacity: 1 }}
            animate={{
                y: done ? "-112%" : "0%",
                opacity: 1,
                boxShadow: done
                    ? "0 18px 34px rgba(26,22,18,0.08)"
                    : "0 0 0 rgba(26,22,18,0)",
            }}
            transition={{
                y: { duration: 1.25, ease: exitEase, delay: done ? 0.12 : 0 },
                boxShadow: { duration: 0.8, ease: "easeOut", delay: done ? 0.12 : 0 },
                opacity: { duration: 0.01, delay: done ? 1.5 : 0 },
            }}
            style={{ pointerEvents: done ? "none" : "all" }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#f6f3ee] will-change-transform"
        >
            <motion.div
                aria-hidden
                className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-[#c9a84c]/35"
                initial={{ opacity: 0 }}
                animate={{ opacity: done ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Ambient radial glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(201,168,76,0.18),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_80%,rgba(217,4,41,0.06),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_80%_15%,rgba(201,168,76,0.10),transparent_55%)]" />
            </div>

            {/* Noise grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Thin top rule */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="absolute top-0 left-0 right-0 h-[1px] origin-left bg-[#c9a84c]/40"
            />

            {/* Main content */}
            <motion.div
                animate={done ? { opacity: 0, y: -28, scale: 0.98, filter: "blur(8px)" } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center"
            >

                {/* Divider above logo */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex w-full items-center gap-3 origin-center"
                >
                    <div className="h-[1px] flex-1 bg-[#c9a84c]/35" />
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]"
                    />
                    <div className="h-[1px] flex-1 bg-[#c9a84c]/35" />
                </motion.div>

                {/* Logo mark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.82, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    className="my-8 text-[#1a1612]"
                >
                    <svg
                        viewBox="320 175 275 130"
                        className="h-14 w-auto sm:h-16 md:h-20"
                        aria-label="Sajib Ahmed"
                        style={{ fill: "currentColor", stroke: "currentColor" }}
                    >
                        <rect x="350.479" y="180.63" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                        <rect x="350.479" y="223.189" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                        <rect x="334.203" y="265.749" width="128.605" height="35.616" rx="8.49" ry="8.49" strokeMiterlimit="10" strokeWidth=".943" />
                        <rect x="326.803" y="201.91" width="78.176" height="35.616" rx="6.619" ry="6.619" transform="translate(146.172 585.608) rotate(-90)" strokeMiterlimit="10" strokeWidth=".735" />
                        <rect x="473.233" y="180.63" width="112.329" height="35.616" rx="7.935" ry="7.935" strokeMiterlimit="10" strokeWidth=".882" />
                        <rect x="508.849" y="235.927" width="41.096" height="18.767" strokeMiterlimit="10" strokeWidth=".387" />
                        <rect x="430.674" y="223.189" width="120.735" height="35.616" rx="8.226" ry="8.226" transform="translate(250.044 732.039) rotate(-90)" strokeMiterlimit="10" strokeWidth=".914" />
                        <rect x="507.386" y="223.189" width="120.735" height="35.616" rx="8.226" ry="8.226" transform="translate(326.756 808.751) rotate(-90)" strokeMiterlimit="10" strokeWidth=".914" />
                        <rect x="405.912" y="244.469" width="78.176" height="35.616" rx="6.619" ry="6.619" transform="translate(182.723 707.277) rotate(-90)" strokeMiterlimit="10" strokeWidth=".735" />
                    </svg>
                </motion.div>

                {/* Divider below logo */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                    className="flex w-full items-center gap-3 origin-center"
                >
                    <div className="h-[1px] flex-1 bg-[#c9a84c]/35" />
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                        className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]"
                    />
                    <div className="h-[1px] flex-1 bg-[#c9a84c]/35" />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75 }}
                    className="mt-7 text-sm leading-7 text-[#5a5045] sm:text-base"
                >
                    Motion that speaks. Design that stays.
                </motion.p>
            </motion.div>

            {/* Bottom rule */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="absolute bottom-0 left-0 right-0 h-[1px] origin-right bg-[#c9a84c]/40"
            />

            {/* Corner marks */}
            {[
                "top-5 left-5 border-t border-l",
                "top-5 right-5 border-t border-r",
                "bottom-5 left-5 border-b border-l",
                "bottom-5 right-5 border-b border-r",
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute h-5 w-5 ${pos} border-[#c9a84c]/40`}
                />
            ))}
        </motion.div>
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed left-0 top-0 z-[55] h-[2px] w-full origin-left bg-[#c9a84c]"
        />
    );
}

function TimelineRail() {
    return (
        <div className="mx-auto mt-8 md:mt-14 max-w-7xl">
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1612]"
            >
                How I make it happen?
            </motion.h2>
            <div className="grid gap-3 sm:grid-cols-3">
            {timeline.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="rounded-[1.5rem] border p-5 border-[#d4c9b8] bg-[#ede8e0]"
                >
                    <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#1a1612]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5a5045]">{item.text}</p>
                </motion.div>
            ))}
            </div>
        </div>
    );
}

function ChapterCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#d90429]/60 bg-[#ede8e0]"
        >
            <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">

                {/* ── Left panel — screenshot as full-bleed background ── */}
                <div className="relative min-h-[240px] overflow-hidden md:min-h-[340px]">

                    {/* Screenshot */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.src}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                    />

                    {/* Gradient — only visible on hover to reveal the title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Subtle warm tint — always present, very light */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />

                    {/* Title — slides up from bottom on hover, hidden at rest */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* ── Right panel — details + CTA ── */}
                <div className="flex flex-col justify-between border-t p-5 sm:p-6 md:p-10 lg:border-l lg:border-t-0 border-[#d4c9b8]">
                    <div>
                        <p className="text-[10px] sm:text-sm uppercase tracking-[0.35em] text-[#8a7a65]">{project.type}</p>
                        <div className="mt-6 space-y-3 text-sm leading-7 text-[#5a5045]">
                            {project.impact.map((phrase) => (
                                <p key={phrase}>{phrase}</p>
                            ))}
                        </div>
                    </div>

                    {/* CTA — live link if url exists, otherwise contact */}
                    {project.url ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-transform duration-300 hover:translate-x-1 text-[#c9a84c] hover:text-[#a8893a]"
                        >
                            View live project <MoveUpRight className="h-4 w-4" />
                        </a>
                    ) : (
                        <a
                            href="#contact"
                            className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-transform duration-300 hover:translate-x-1 text-[#c9a84c] hover:text-[#a8893a]"
                        >
                            Discuss this direction <MoveUpRight className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

function ReelPanel() {
    return (
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border p-4 md:p-6 border-[#d4c9b8] bg-[#ede8e0]">
            <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85 }}
                    className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-[#c9a84c]/30 bg-[linear-gradient(145deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))]"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(201,168,76,0.20),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(201,168,76,0.10),transparent_25%)]" />
                    <motion.div
                        animate={{ scale: [1, 1.03, 1], rotate: [0, 0.5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-end p-5 sm:p-6 md:p-8"
                    >
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a7a65]">Autoplay muted visual</p>
                            <p className="mt-2 max-w-sm text-xl font-medium leading-tight sm:text-2xl md:text-4xl text-[#1a1612]">
                                Motion-first storytelling for immersive digital brands.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="rounded-[1.25rem] sm:rounded-[1.5rem] border p-5 sm:p-6 md:p-8 border-[#d4c9b8] bg-[#e6dfd4]"
                    >
                        <div className="flex items-center gap-3 text-sm text-[#8a7a65]">
                            <Film className="h-4 w-4" /> Motion Reel
                        </div>
                        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8 text-[#2a2218]">
                            Frame-by-frame pacing, cinematic reveals, and soft transitions designed to feel expensive and intentional.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="rounded-[1.25rem] sm:rounded-[1.5rem] border p-5 sm:p-6 md:p-8 border-[#d4c9b8] bg-[#e6dfd4]"
                    >
                        <div className="flex items-center gap-3 text-sm text-[#8a7a65]">
                            <Sparkles className="h-4 w-4" /> Visual Language
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[#5a5045]">
                            Subtle blur, depth shifts, and time-based easing create anticipation between sections without overwhelming the composition.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function OrbitBadge() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute right-[8%] top-[8%] h-[160px] w-[160px] rounded-full border border-[#c9a84c]/30 sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px]"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute left-[7%] bottom-[10%] h-[120px] w-[120px] rounded-[2.2rem] border border-[#c9a84c]/25 sm:h-[170px] sm:w-[170px] md:h-[220px] md:w-[220px]"
            />
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[16%] right-[12%] h-[80px] w-[80px] rounded-full blur-3xl bg-[#c9a84c]/15 sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px]"
            />
        </div>
    );
}

export default function SajibPortfolioPage() {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const reduced = useReducedMotionSafe();
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, amount: 0.25 });
    const controls = useAnimation();
    const [bootDone, setBootDone] = useState(false);

    useEffect(() => {
        controls.start("show");
    }, [controls]);

    useEffect(() => {
        // Track active section for morph shape
        const sections = document.querySelectorAll("section[data-section]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.section);
                        setActiveSectionIndex(idx);
                    }
                });
            },
            { threshold: 0.3 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [bootDone]);

    useEffect(() => {
        const t = window.setTimeout(() => setBootDone(true), reduced ? 0 : 2450);
        return () => window.clearTimeout(t);
    }, [reduced]);

    useEffect(() => {
        if (reduced) return;
        let cancelled = false;
        let cleanup = () => { };

        (async () => {
            try {
                const { default: Lenis } = await import("lenis");
                if (cancelled) return;
                const { gsap } = await import("gsap");
                const { ScrollTrigger } = await import("gsap/ScrollTrigger");
                gsap.registerPlugin(ScrollTrigger);

                const lenis = new Lenis({
                    duration: 1.15,
                    smoothWheel: true,
                    wheelMultiplier: 1,
                });

                // Sync Lenis scroll position with GSAP ScrollTrigger
                lenis.on("scroll", ScrollTrigger.update);

                let frame = 0;
                const raf = (time: number) => {
                    lenis.raf(time);
                    frame = requestAnimationFrame(raf);
                };
                frame = requestAnimationFrame(raf);
                cleanup = () => {
                    cancelAnimationFrame(frame);
                    lenis.destroy();
                };
            } catch {
                cleanup = () => { };
            }
        })();

        return () => {
            cancelled = true;
            cleanup();
        };
    }, [reduced]);

    const headline = useMemo(() => ["SAJIB", "AHMED"], []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f6f3ee] text-[#111111]">
            <ScrollProgress />
            <FloatingNavbar />
            <CursorGlow />
            <BootSequence done={bootDone} />
            <NoiseOverlay />
            <MorphShape sectionIndex={activeSectionIndex} />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(201,168,76,0.08),transparent_25%)]" />

            <section
                ref={heroRef}
                data-section="0"
                className="relative flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 sm:py-10 md:px-10"
            >
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
                        <div className="relative z-10 flex flex-col justify-center">
                            <motion.div
                                initial="hidden"
                                animate={heroInView ? "show" : "hidden"}
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                                }}
                            >
                                <motion.h1
                                    variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                                    className="relative max-w-5xl overflow-visible text-[clamp(3rem,16vw,13rem)] font-black uppercase leading-[0.9] tracking-normal text-[#111111]"
                                >
                                    <span className="relative inline-block overflow-visible">
                                        {splitText(headline[0])}
                                    </span>
                                    <br />
                                    <span className="relative inline-block overflow-visible">
                                        {splitText(headline[1])}
                                    </span>
                                </motion.h1>

                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                                    className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5"
                                >
                                    <p className="max-w-xl text-sm leading-7 text-[#5a5045] sm:text-base sm:leading-8 md:text-lg">
                                        People build pages. I build experiences that move, react, and leave a lasting impression.
                                    </p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {["Modern", "Bold", "Intentional"].map((item) => (
                                            <div
                                                key={item}
                                                className="rounded-full border px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium border-[#c9a84c]/40 bg-[#c9a84c]/8 text-[#5a4a2a]"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>

                        </div>

                        <motion.aside
                            initial={{ opacity: 0, x: 40, filter: "blur(14px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                            className="relative hidden lg:block rounded-[2rem] border p-4 shadow-2xl backdrop-blur-md lg:mt-8 border-[#d4c9b8] bg-[#ede8e0] shadow-[#c9a84c]/10"
                        >
                            {/* Photo card — 4:5 matches the image's natural ratio */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">

                                {/* The headshot — object-top keeps the face in frame */}
                                <Image
                                    src="/headshot.jpeg"
                                    alt="Sajib Ahmed"
                                    fill
                                    sizes="(max-width: 1280px) 30vw, 380px"
                                    className="object-cover object-top"
                                    priority
                                />

                                {/* Subtle vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                                {/* Thin gold border overlay */}
                                <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-[#c9a84c]/20" />

                                {/* Caption */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <p className="mt-1.5 text-sm font-medium leading-snug text-white/90">
                                        Web Developer &amp; Creative Designer
                                    </p>
                                </div>
                            </div>

                            {/* Stat chips */}
                            <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
                                <div className="rounded-2xl border p-3.5 border-[#d4c9b8] bg-[#e6dfd4]">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a7a65]">Based in</p>
                                    <p className="mt-1 text-sm font-semibold text-[#1a1612]">Bangladesh</p>
                                </div>
                                <div className="rounded-2xl border p-3.5 border-[#d4c9b8] bg-[#e6dfd4]">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a7a65]">Available</p>
                                    <p className="mt-1 text-sm font-semibold text-[#1a1612]">For freelance</p>
                                </div>
                            </div>
                        </motion.aside>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.8 }}
                        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.35em] md:flex text-[#8a7a65]"
                    >
                        <span>Scroll</span>
                        <ChevronDown className="h-4 w-4" />
                    </motion.div>
                </div>
            </section>

            <section data-section="1" id="works" className="relative px-4 py-14 sm:px-6 sm:py-16 md:py-28 md:px-10">
                <div className="relative mb-10 sm:mb-14 overflow-hidden">
                    <SectionTitle
                        eyebrow=""
                        title="Turning Ideas Into Websites, Made to Be Remembered."
                        copy="I like giving projects room to breathe. Each one is presented differently, shaped by its goals rather than a fixed template."
                    />
                </div>

                <div className="mx-auto grid max-w-7xl gap-6">
                    {projects.map((project, index) => (
                        <ChapterCard key={project.title} project={project} index={index} />
                    ))}
                </div>

                <TimelineRail />
            </section>

            <section data-section="2" className="relative flex sm:min-h-screen items-center justify-center overflow-hidden px-4 pt-10 pb-0 sm:px-6 md:pt-28 md:pb-0 md:px-10">
                <motion.div
                    initial={{ scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex aspect-square w-full max-w-[min(90vw,900px)] items-center justify-center overflow-hidden rounded-full border border-[#c9a84c]/35"
                >
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-[12%] rounded-full border border-[#c9a84c]/25"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-[24%] rounded-full blur-3xl bg-[#c9a84c]/20"
                    />

                    <div className="relative z-10 text-center">
                        <h2 className="overflow-visible text-[clamp(3rem,14vw,11rem)] font-black uppercase leading-[0.9] tracking-normal text-[#1a1612]">
                            DEPTH
                        </h2>
                    </div>
                </motion.div>
            </section>

            <HorizontalGallery />

            <section data-section="3" className="relative overflow-hidden py-10 sm:py-24 md:py-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.10),transparent_45%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 md:px-10"
                >
                    <BlurText
                        text="FUTURE"
                        animateBy="letters"
                        direction="bottom"
                        delay={100}
                        stepDuration={0.55}
                        threshold={0.3}
                        className="overflow-visible text-[clamp(3rem,18vw,18rem)] font-black uppercase leading-[0.9] tracking-normal text-[#1a1612] justify-center"
                    />
                </motion.div>
            </section>

            <section data-section="4" className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:py-32 md:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.08),transparent_35%)]" />

                <SectionTitle
                    eyebrow="Orbital Typography"
                    title="Earth writing your identity back to you."
                    copy="Five real locations seen from above — each frame a letter, each coordinate a story. Click any card to open the location in Google Maps."
                />

                <div className="mx-auto mt-8 sm:mt-10 md:mt-16 grid max-w-7xl gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-5">
                    {[
                        {
                            letter: "S",
                            src: "/s_1.jpg",
                            place: "Rio Chapare",
                            region: "Bolivia",
                            coords: "16°56′04.7″S / 65°13′44.2″W",
                            mapUrl: "https://www.google.com/maps/place/16%C2%B056'04.7%22S+65%C2%B013'44.2%22W/@-16.9344175,-65.2346053,4314m/data=!3m1!1e3!4m4!3m3!8m2!3d-16.9346389!4d-65.2289444?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D",
                            shape: "rounded-[1.5rem] sm:rounded-[2.5rem]",
                        },
                        {
                            letter: "A",
                            src: "/a_2.jpg",
                            place: "Lake Mjøsa",
                            region: "Norway",
                            coords: "60°45′52.7″N / 10°56′43.2″E",
                            mapUrl: "http://www.google.com/maps/place/60°45'52.7\"N+10°56'43.2\"E/@60.8074458,10.6019,66798m/data=!3m1!1e3!4m4!3m3!8m2!3d60.764635!4d10.945344?entry=tts",
                            shape: "rounded-[1.25rem] sm:rounded-[2rem]",
                        },
                        {
                            letter: "J",
                            src: "/j_3.jpg",
                            place: "Great Barrier Reef",
                            region: "Australia",
                            coords: "18°20′55.3″S / 146°50′51.4″E",
                            mapUrl: "https://www.google.com/maps/place/18%C2%B020'55.3%22S+146%C2%B050'51.4%22E/@-18.3013843,146.8642487,68503m/data=!3m1!1e3!4m4!3m3!8m2!3d-18.3486944!4d146.8476111?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D",
                            shape: "rounded-[1.75rem] sm:rounded-[3rem]",
                        },
                        {
                            letter: "I",
                            src: "/i_4.jpg",
                            place: "Etosha Pan",
                            region: "Namibia",
                            coords: "18°29′15.2″S / 16°10′14.6″E",
                            mapUrl: "https://www.google.com/maps/place/18%C2%B029'15.2%22S+16%C2%B010'14.6%22E/@-18.5223486,15.9779212,136830m/data=!3m1!1e3!4m4!3m3!8m2!3d-18.4875556!4d16.1707222?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D",
                            shape: "rounded-[1.25rem] sm:rounded-[2.2rem]",
                        },
                        {
                            letter: "B",
                            src: "/b_5.jpg",
                            place: "Humaitá",
                            region: "Brazil",
                            coords: "7°37′00.1″S / 62°55′17.0″W",
                            mapUrl: "https://www.google.com/maps/place/7%C2%B037'00.1%22S+62%C2%B055'17.0%22W/@-7.5838576,-62.9548051,21263m/data=!3m1!1e3!4m4!3m3!8m2!3d-7.6166944!4d-62.9213889?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D",
                            shape: "rounded-[1.5rem] sm:rounded-[2.8rem]",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={item.letter}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                        >
                            {/* Card — clicking opens the map link */}
                            <a
                                href={item.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${item.place} on Google Maps`}
                                className={`relative block aspect-[0.72] overflow-hidden border border-[#d4c9b8] ${item.shape} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]`}
                            >
                                {/* Satellite photo — fills card, slow zoom on hover */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.src}
                                    alt={`${item.place}, ${item.region} — satellite view`}
                                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Permanent dark vignette — bottom-heavy so caption is always legible */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                                {/* Subtle gold tint overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,76,0.18),transparent_50%)] opacity-60" />

                                {/* Hover info overlay — slides up */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.28 }}
                                    className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 backdrop-blur-[2px] bg-black/40"
                                >
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#c9a84c]/90">
                                        Earthform Archive
                                    </p>
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white/50 mb-0.5">
                                            {item.region}
                                        </p>
                                        <h3 className="text-xs sm:text-base font-semibold text-white leading-tight">
                                            {item.place}
                                        </h3>
                                        <p className="mt-1 sm:mt-1.5 text-[7px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.18em] text-white/45 font-mono">
                                            {item.coords}
                                        </p>
                                        {/* Map link indicator */}
                                        <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
                                            <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#c9a84c]" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.25em] text-[#c9a84c]/80">
                                                Open in Maps
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Always-visible bottom caption (before hover) */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                                    <p className="text-[8px] sm:text-[10px] font-medium text-white/80 leading-tight truncate">
                                        {item.place}
                                    </p>
                                    <p className="text-[7px] sm:text-[9px] text-white/45 font-mono tracking-[0.1em] mt-0.5 truncate">
                                        {item.coords}
                                    </p>
                                </div>
                            </a>

                            {/* Letter + label below card */}
                            <div className="mt-3 sm:mt-5 flex items-center justify-between px-0.5 sm:px-1">
                                <p className="text-xl sm:text-3xl font-black uppercase tracking-[-0.08em] text-[#1a1612]">
                                    {item.letter}
                                </p>
                                <div className="h-[1px] flex-1 mx-2 sm:mx-3 bg-[#c9a84c]/30" />
                                <p className="hidden sm:block text-[10px] uppercase tracking-[0.35em] text-[#8a7a65]">
                                    {item.region}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section data-section="5" className="relative hidden md:block px-4 py-14 sm:px-6 sm:py-16 md:py-28 md:px-10">
                <SectionTitle
                    eyebrow="Typing Challenge"
                    title="Let's see how fast you are."
                    copy="Race my 80 WPM auto-typer. Type the passage, track your speed live, and see the full breakdown at the end. Desktop and tablet only."
                />
                <div className="mx-auto max-w-7xl">
                    <TypingChallenge />
                </div>
            </section>

            <section data-section="6" className="relative px-4 py-14 sm:px-6 sm:py-16 md:py-28 md:px-10">
                <SectionTitle
                    eyebrow="About"
                    title="Minimal copy. Maximum presence."
                    copy="A concise narrative that positions you as both a developer and a designer — someone who builds polished interfaces with taste, rhythm, and purpose."
                />

                <div className="mx-auto grid max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8 }}
                        className="rounded-[1.5rem] sm:rounded-[2rem] border p-6 sm:p-8 border-[#d4c9b8] bg-[#ede8e0]"
                    >
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8a7a65]">Profile</p>
                        <WordReveal
                            as="p"
                            text="Web developer crafting refined interfaces and creative designer shaping the visual story."
                            className="mt-5 sm:mt-6 text-xl font-medium leading-tight sm:text-2xl md:text-4xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {[
                            {
                                icon: Code2,
                                title: "Development",
                                text: "Clean Next.js architecture with scalable component systems and performance-first thinking.",
                            },
                            {
                                icon: Layers3,
                                title: "Design",
                                text: "Bold typography, minimal composition, editorial spacing, and high-contrast visual hierarchy.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-[1.25rem] sm:rounded-[1.5rem] border p-5 sm:p-6 border-[#d4c9b8] bg-[#e6dfd4]">
                                <item.icon className="h-5 w-5 text-[#c9a84c]" />
                                <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-[#1a1612]">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[#5a5045]">{item.text}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <ShapeDivider variant="arc-down" />

            <section data-section="7" className="relative px-4 py-14 sm:px-6 sm:py-16 md:py-28 md:px-10">
                <SectionTitle
                    eyebrow=""
                    title="An animated toolkit, not a static checklist."
                    copy="The stack is presented like a living system, using motion and spatial rhythm to reinforce the premium feel."
                />

                <div className="mx-auto max-w-7xl overflow-hidden">
                    <LogoLoop
                        logos={[
                            { src: "/HTML.png",         alt: "HTML" },
                            { src: "/CSS.png",          alt: "CSS" },
                            { src: "/Javascript.png",   alt: "JavaScript" },
                            { src: "/React_js.png",     alt: "React" },
                            { src: "/Tailwind_CSS.png", alt: "Tailwind CSS" },
                            { src: "/Github.png",       alt: "GitHub" },
                            { src: "/Next_js.png",      alt: "Next.js" },
                            { src: "/Photoshop.png",    alt: "Photoshop" },
                            { src: "/Illustrator.png",  alt: "Illustrator" },
                            { src: "/Blender.png",      alt: "Blender" },
                        ]}
                        speed={80}
                        direction="left"
                        logoHeight={52}
                        gap={48}
                        pauseOnHover={false}
                        fadeOut
                        fadeOutColor="#f6f3ee"
                        ariaLabel="Technology stack"
                    />
                </div>
            </section>

            <section id="contact" data-section="8" className="relative px-4 pt-14 pb-6 sm:px-6 sm:pt-16 sm:pb-8 md:pt-28 md:pb-10 md:px-10">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.25rem] border p-5 sm:p-8 md:p-12 border-[#d4c9b8] bg-[linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))]">
                    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.45em] text-[#8a7a65]">Contact</p>
                            <h2 className="mt-4 sm:mt-5 max-w-4xl text-[clamp(1.8rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em] sm:tracking-[-0.08em] text-[#1a1612]">
                                Let&apos;s build something unforgettable.
                            </h2>
                            <p className="mt-5 sm:mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8 md:text-lg text-[#5a5045]">
                                <WordReveal
                                    as="span"
                                    text="Available for premium freelance work, product launches, and cinematic portfolio experiences."
                                    className="inline"
                                />
                            </p>
                            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                                <MagneticButton href="mailto:sajib@example.com">Email Sajib</MagneticButton>
                                <MagneticButton href="#">LinkedIn</MagneticButton>
                            </div>
                        </div>

                        <div className="rounded-[1.5rem] sm:rounded-[1.75rem] border p-5 sm:p-6 md:p-8 border-[#d4c9b8] bg-[#e6dfd4]">
                            <div className="flex items-center gap-3 text-sm text-[#c9a84c]">
                                <Mail className="h-4 w-4" /> Minimal CTA
                            </div>
                            <p className="mt-4 text-sm leading-7 text-[#5a5045]">
                                Keep the contact area clean, elegant, and highly legible so it lands like a final title card.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 md:px-10 md:pt-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t pt-5 sm:pt-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] md:flex-row md:items-center md:justify-between border-[#d4c9b8] text-[#8a7a65]">
                    <p>© 2026 Sajib Ahmed</p>
                    <p>Designed for motion, clarity, and cinematic impact</p>
                </div>
            </footer>
        </main>
    );
}
