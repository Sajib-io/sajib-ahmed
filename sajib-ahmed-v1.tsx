"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  SunMedium,
  MoonStar,
  ChevronDown,
  Code2,
  Film,
  Layers3,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    title: "Nebula Commerce",
    type: "Ecommerce / Motion Direction",
    desc: "A dark editorial storefront with cinematic product reveals, parallax cards, and conversion-focused storytelling.",
    tag: "Selected Work 01",
    accent: "from-white/18 via-white/8 to-transparent",
  },
  {
    title: "Luma Studio",
    type: "Brand Experience / Creative Site",
    desc: "A premium studio presence built around kinetic typography, layered scroll scenes, and immersive visual rhythm.",
    tag: "Selected Work 02",
    accent: "from-white/12 via-white/6 to-transparent",
  },
  {
    title: "Pulse OS",
    type: "SaaS / Interactive UI",
    desc: "A futuristic product narrative with fluid transitions, magnetic interactions, and clean information hierarchy.",
    tag: "Selected Work 03",
    accent: "from-white/16 via-white/7 to-transparent",
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
    title: "Boot",
    text: "The page wakes like a system initialization screen — slow, deliberate, and atmospheric.",
  },
  {
    id: "02",
    title: "Archive",
    text: "Projects are framed as cinematic chapters instead of static thumbnails.",
  },
  {
    id: "03",
    title: "Signal",
    text: "The stack and contact sections close the experience like a final title card.",
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
      className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
    >
      <span>{children}</span>
      <MoveUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  theme,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  theme: "dark" | "light";
}) {
  return (
    <div className="mx-auto mb-10 max-w-4xl px-6 text-center md:px-10">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7 }}
        className={`mb-4 text-[10px] uppercase tracking-[0.48em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`text-3xl font-semibold tracking-tight md:text-5xl ${theme === "dark" ? "text-white" : "text-[#111111]"}`}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, delay: 0.12 }}
        className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${theme === "dark" ? "text-white/62" : "text-black/62"} md:text-base`}
      >
        {copy}
      </motion.p>
    </div>
  );
}

function NoiseOverlay() {
  return (
    <>
      <style>{`
        .noise-overlay {
          background-image: linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 3px 3px, 3px 3px;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen">
        <div className="noise-overlay h-full w-full" />
      </div>
    </>
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
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full bg-white/8 blur-3xl md:block"
      style={{ x: glowX, y: glowY, opacity: ready ? 0.75 : 0 }}
    />
  );
}

function FloatingNavbar({ theme }: { theme: "dark" | "light" }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8"
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border ${theme === "dark" ? "border-white/10 bg-black/30" : "border-black/10 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"} px-5 py-4 backdrop-blur-2xl`}>
        <p className="text-xs font-black uppercase tracking-[0.4em] text-white">SAJIB AHMED</p>

        <nav className="hidden items-center gap-8 md:flex">
          {["Works", "Archive", "Stack", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-[11px] uppercase tracking-[0.35em] ${theme === "dark" ? "text-white/50 hover:text-white" : "text-black/45 hover:text-black"} transition-colors duration-300`}
            >
              {item}
            </a>
          ))}
        </nav>

        <button className={`flex h-10 w-10 items-center justify-center rounded-full border ${theme === "dark" ? "border-white/10" : "border-black/10"} text-white/70 transition-colors hover:bg-white/10 md:hidden`}>
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </motion.header>
  );
}

function BootSequence({ done, theme }: { done: boolean; theme: "dark" | "light" }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: done ? "none" : "all" }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
    >
      <div className="w-full max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-[10px] uppercase tracking-[0.5em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}
        >
          Visual system loading
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-5 text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-[-0.08em] text-white"
        >
          INITIALIZING ARCHIVE
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mx-auto mt-8 h-[1px] max-w-md bg-white/20"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 text-sm text-white/50"
        >
          Typography calibrated. Motion online. Narrative sequence armed.
        </motion.p>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[55] h-[2px] w-full origin-left bg-white/80"
    />
  );
}

function TimelineRail({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className="mx-auto mt-14 grid max-w-7xl gap-3 md:grid-cols-3">
      {timeline.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: index * 0.08 }}
          className={`rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-5`}
        >
          <p className={`text-[10px] uppercase tracking-[0.45em] ${theme === "dark" ? "text-white/35" : "text-black/35"}`}>Chapter {item.id}</p>
          <h3 className={`mt-4 text-xl font-semibold ${theme === "dark" ? "text-white" : "text-[#111111]"}`}>{item.title}</h3>
          <p className={`mt-3 text-sm leading-7 ${theme === "dark" ? "text-white/62" : "text-black/62"}`}>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ChapterCard({ project, index, theme }: { project: (typeof projects)[number]; index: number; theme: "dark" | "light" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[2rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"}`}
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
        <div className="relative min-h-[360px] overflow-hidden p-6 md:min-h-[460px] md:p-10">
          <motion.div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.15),transparent_22%),radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]`}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 opacity-70">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
          </div>

          <div className="relative flex h-full flex-col justify-between">
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">{project.tag}</p>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/35">Cinematic chapter</p>
              <h3 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-7xl">
                {project.title}
              </h3>
              <p className={`mt-4 max-w-xl text-sm leading-7 ${theme === "dark" ? "text-white/62" : "text-black/62"} md:text-base`}>
                {project.desc}
              </p>
            </div>
          </div>
        </div>

        <div className={`flex flex-col justify-between border-t ${theme === "dark" ? "border-white/10" : "border-black/10"} p-6 md:p-10 lg:border-l lg:border-t-0`}>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">{project.type}</p>
            <div className="mt-8 space-y-4 text-sm leading-7 text-white/60">
              <p>Scroll-driven reveal</p>
              <p>Editorial pacing</p>
              <p>Motion hierarchy</p>
              <p>High-contrast typography</p>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-transform duration-300 hover:translate-x-1"
          >
            Discuss this direction <MoveUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ReelPanel({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-4 md:p-6`}>
      <div className="grid min-h-[420px] gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85 }}
          className={`relative overflow-hidden rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_70%_75%,rgba(255,255,255,0.12),transparent_18%)]" />
          <motion.div
            animate={{ scale: [1, 1.03, 1], rotate: [0, 0.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-end p-6 md:p-8"
          >
            <div>
              <p className={`text-[10px] uppercase tracking-[0.4em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}>Autoplay muted visual</p>
              <p className="mt-2 max-w-sm text-2xl font-medium leading-tight text-white md:text-4xl">
                Motion-first storytelling for immersive digital brands.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className={`rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-black/20 p-6 md:p-8`}
          >
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Film className="h-4 w-4" /> Motion Reel
            </div>
            <p className="mt-4 text-lg leading-8 text-white/85">
              Frame-by-frame pacing, cinematic reveals, and soft transitions designed to feel expensive and intentional.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className={`rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-black/20 p-6 md:p-8`}
          >
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Sparkles className="h-4 w-4" /> Visual Language
            </div>
            <p className={`mt-4 text-sm leading-7 ${theme === "dark" ? "text-white/62" : "text-black/62"}`}>
              Subtle blur, depth shifts, and time-based easing create anticipation between sections without overwhelming the composition.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OrbitBadge({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className={`absolute right-[8%] top-[8%] h-[280px] w-[280px] rounded-full border ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className={`absolute left-[7%] bottom-[10%] h-[220px] w-[220px] rounded-[2.2rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[16%] right-[12%] h-[140px] w-[140px] rounded-full bg-white/[0.04] blur-3xl"
      />
    </div>
  );
}

export default function SajibPortfolioPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const reduced = useReducedMotionSafe();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.25 });
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setBootDone(true), reduced ? 0 : 1900);
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
        const lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        let frame = 0;
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
        cleanup = () => cancelAnimationFrame(frame);
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
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${theme === "dark"
          ? "bg-[#050505] text-white"
          : "bg-[#f6f3ee] text-[#111111]"
        }`}
    >
      <ScrollProgress />
      <FloatingNavbar theme={theme} />

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-2xl transition-all duration-500 hover:scale-[1.03] ${theme === "dark" ? "border-white/10 bg-white/5 text-white" : "border-black/10 bg-black/[0.04] text-[#111111]"}`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500 ${theme === "dark" ? "bg-white/10" : "bg-black/10"
            }`}
        >
          {theme === "dark" ? (
            <MoonStar className="h-4 w-4" />
          ) : (
            <SunMedium className="h-4 w-4" />
          )}
        </div>

        <div className="text-left">
          <p className="text-[9px] uppercase tracking-[0.35em] opacity-45">
            Visual Mode
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em]">
            {theme === "dark" ? "Dark System" : "Light System"}
          </p>
        </div>
      </motion.button>
      <CursorGlow />
      <BootSequence done={bootDone} theme={theme} />
      <OrbitBadge theme={theme} />
      <NoiseOverlay />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center px-6 py-10 md:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
            <div className="relative z-10 flex flex-col justify-center">
              <motion.div
                initial="hidden"
                animate={heroInView ? "show" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className={`mb-5 text-[10px] uppercase tracking-[0.5em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}
                >
                  Sajib Ahmed / Web Developer / Creative Designer
                </motion.p>

                <motion.h1
                  variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                  className="relative max-w-5xl text-[clamp(4.5rem,18vw,13rem)] font-black uppercase leading-[0.82] tracking-[-0.12em] text-white"
                >
                  <span className="relative inline-block">
                    {splitText(headline[0])}
                    <span className="absolute left-0 top-1/2 h-[1px] w-full bg-white/20" />
                  </span>
                  <br />
                  <span className="relative inline-block">
                    {splitText(headline[1])}
                    <motion.span
                      animate={bootDone ? { width: ["0%", "100%"] } : { width: "0%" }}
                      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-2 left-0 h-[12px] bg-white/10"
                    />
                  </span>
                </motion.h1>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  className="mt-8 flex flex-col gap-5"
                >
                  <p className={`max-w-xl text-base leading-8 ${theme === "dark" ? "text-white/65" : "text-black/65"} md:text-lg`}>
                    I build cinematic digital experiences where motion, typography, and storytelling work as one system.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["KINETIC TYPE", "VISUAL SYSTEMS", "EDITORIAL UI"].map((item) => (
                      <div
                        key={item}
                        className={`rounded-full border ${theme === "dark" ? "border-white/10" : "border-black/10"} px-4 py-2 text-[10px] uppercase tracking-[0.3em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <MagneticButton href="#works">View Selected Works</MagneticButton>
                <MagneticButton href="#contact">Start a Project</MagneticButton>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 40, filter: "blur(14px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className={`relative rounded-[2rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-5 shadow-2xl shadow-black/30 backdrop-blur-md lg:mt-8`}
            >
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.20),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.10),transparent_20%)]" />
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-end p-6"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Interactive visual experience</p>
                    <p className="mt-3 max-w-xs text-xl font-medium leading-tight text-white">
                      Premium motion systems. Elegant pacing. High-impact storytelling.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className={`mt-5 grid grid-cols-2 gap-3 text-sm ${theme === "dark" ? "text-white/65" : "text-black/65"}`}>
                <div className={`rounded-2xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-4`}>
                <p className="text-white/40">Focus</p>
                <p className="mt-1 font-medium text-white">Animation-first portfolios</p>
              </div>
              <div className={`rounded-2xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-4`}>
                <p className="text-white/40">Mode</p>
                <p className="mt-1 font-medium text-white">Cinematic and minimal</p>
              </div>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/35 md:flex"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </div>
      </section >

      <section id="works" className="relative px-6 py-28 md:px-10">
        <div className="relative mb-14 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 text-[20vw] font-black uppercase leading-none tracking-[-0.12em] text-white/[0.03]">
            WORK
          </div>
          <SectionTitle
            eyebrow="Selected Works"
            title="Fullscreen stories, not static thumbnails."
            copy="Each project is framed like a chapter: bold, spacious, typography-driven, and shaped through cinematic composition instead of predictable layouts."
            theme={theme}
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-6">
          {projects.map((project, index) => (
            <ChapterCard key={project.title} project={project} index={index} theme={theme} />
          ))}
        </div>

        <TimelineRail theme={theme} />
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 md:px-10">
        <motion.div
          initial={{ scale: 0.65, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex aspect-square w-full max-w-[900px] items-center justify-center overflow-hidden rounded-full border ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-[12%] rounded-full border ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
          />

          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[24%] rounded-full bg-white/[0.04] blur-3xl"
          />

          <div className="relative z-10 text-center">
            <p className={`mb-5 text-[10px] uppercase tracking-[0.45em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}>Cinematic Zoom Transition</p>
            <h2 className="text-[clamp(4rem,14vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.12em] text-white">
              DEPTH
            </h2>
          </div>
        </motion.div>
      </section>

      <section className={`relative overflow-hidden border-y ${theme === "dark" ? "border-white/10" : "border-black/10"} py-40`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_38%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center md:px-10"
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-white/35">
            Future Interface System
          </p>

          <motion.h2
            animate={{ letterSpacing: ["-0.08em", "-0.12em", "-0.08em"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[clamp(5rem,22vw,18rem)] font-black uppercase leading-[0.8] tracking-[-0.1em] text-white"
          >
            FUTURE
          </motion.h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
            A dedicated cinematic pause in the experience — oversized typography, restrained motion, and atmospheric composition designed to feel monumental.
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-6 py-32 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />

        <SectionTitle
          eyebrow="Orbital Typography"
          title="Earth writing your identity back to you."
          copy="Inspired by satellite typography systems and cinematic archives — each frame represents a letter from the name SAJIB using abstract terrain-inspired placeholders that can later be replaced with real satellite imagery."
          theme={theme}
        />

        <div className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-5">
          {[
            {
              letter: "S",
              place: "Salt Basin / Bolivia",
              coords: "20.133°S / 67.489°W",
              shape: "rounded-[2.5rem]",
              gradient:
                "from-white/20 via-white/5 to-transparent",
            },
            {
              letter: "A",
              place: "Arctic Ridge / Greenland",
              coords: "71.102°N / 42.118°W",
              shape: "rounded-[2rem]",
              gradient:
                "from-white/15 via-white/6 to-transparent",
            },
            {
              letter: "J",
              place: "Jade Coast / Iceland",
              coords: "64.551°N / 18.441°W",
              shape: "rounded-[3rem]",
              gradient:
                "from-white/18 via-white/8 to-transparent",
            },
            {
              letter: "I",
              place: "Iron Dunes / Namibia",
              coords: "24.821°S / 15.004°E",
              shape: "rounded-[2.2rem]",
              gradient:
                "from-white/16 via-white/4 to-transparent",
            },
            {
              letter: "B",
              place: "Blackwater Delta / Canada",
              coords: "58.772°N / 111.291°W",
              shape: "rounded-[2.8rem]",
              gradient:
                "from-white/20 via-white/7 to-transparent",
            },
          ].map((item, index) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div
                className={`relative aspect-[0.72] overflow-hidden border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} ${item.shape}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.16),transparent_20%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]"
                />

                <div className="absolute inset-0 opacity-40 mix-blend-screen">
                  <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px]" />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col justify-between bg-black/55 p-5 backdrop-blur-md"
                >
                  <p className={`text-[10px] uppercase tracking-[0.4em] ${theme === "dark" ? "text-white/45" : "text-black/40"}`}>
                    Earthform Archive
                  </p>

                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {item.place}
                    </h3>
                    <p className="mt-2 text-xs tracking-[0.2em] text-white/50">
                      {item.coords}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-5 flex items-center justify-between px-1">
                <p className="text-3xl font-black uppercase tracking-[-0.08em] text-white">
                  {item.letter}
                </p>

                <div className="h-[1px] flex-1 bg-white/10 mx-3" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  Orbital glyph
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-10">
        <SectionTitle
          eyebrow="Creative Reel"
          title="A motion showcase that feels alive."
          copy="Use this space for a looping reel, animated mockups, or a slow editorial video with layered transitions and subtle grain."
          theme={theme}
        />
        <div className="mx-auto max-w-7xl">
          <ReelPanel theme={theme} />
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-10">
        <SectionTitle
          eyebrow="About"
          title="Minimal copy. Maximum presence."
          copy="A concise narrative that positions you as both a developer and a designer — someone who builds polished interfaces with taste, rhythm, and purpose."
          theme={theme}
        />

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
            className={`rounded-[2rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-8`}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Profile</p>
            <p className="mt-6 text-2xl font-medium leading-tight text-white md:text-4xl">
              Web developer crafting refined interfaces and creative designer shaping the visual story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-4 md:grid-cols-2"
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
              <div key={item.title} className={`rounded-[1.5rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.025]"} p-6`}>
                <item.icon className="h-5 w-5 text-white/70" />
                <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${theme === "dark" ? "text-white/62" : "text-black/62"}`}>{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-10">
        <SectionTitle
          eyebrow="Skills / Stack"
          title="An animated toolkit, not a static checklist."
          copy="The stack is presented like a living system, using motion and spatial rhythm to reinforce the premium feel."
          theme={theme}
        />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-wrap gap-3"
          >
            {stack.map((item) => (
              <motion.div
                key={item}
                variants={{ hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white/80 backdrop-blur"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative px-6 py-28 md:px-10">
        <div className={`mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-8 md:p-12`}>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">Contact</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                Let&apos;s build something unforgettable.
              </h2>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${theme === "dark" ? "text-white/65" : "text-black/65"} md:text-lg`}>
                Available for premium freelance work, product launches, and cinematic portfolio experiences.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href="mailto:sajib@example.com">Email Sajib</MagneticButton>
                <MagneticButton href="#">LinkedIn</MagneticButton>
              </div>
            </div>

            <div className={`rounded-[1.75rem] border ${theme === "dark" ? "border-white/10" : "border-black/10"} bg-black/20 p-6 md:p-8`}>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4" /> Minimal CTA
              </div>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Keep the contact area clean, elegant, and highly legible so it lands like a final title card.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden px-6 pb-10 pt-24 md:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-[18vw] font-black uppercase leading-none tracking-[-0.12em] text-white/[0.03]">
          SAJIB
        </div>
        <div className={`mx-auto flex max-w-7xl flex-col gap-3 border-t ${theme === "dark" ? "border-white/10" : "border-black/10"} pt-6 text-[10px] uppercase tracking-[0.35em] text-white/35 md:flex-row md:items-center md:justify-between`}>
          <p>© 2026 Sajib Ahmed</p>
          <p>Designed for motion, clarity, and cinematic impact</p>
        </div>
      </footer>
    </main >
  );
}
