"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/library-01.jpg",
    label: "01 — Visual Identity",
    title: "Nebula Commerce",
    sub: "Ecommerce / Motion Direction",
    accentLight: "#c9a84c",
  },
  {
    id: 2,
    src: "/library-02.jpg",
    label: "02 — Brand Experience",
    title: "Luma Studio",
    sub: "Creative Site / Kinetic Type",
    accentLight: "#b8956a",
  },
  {
    id: 3,
    src: "/library-03.jpg",
    label: "03 — SaaS Product",
    title: "Pulse OS",
    sub: "Interactive UI / Motion Systems",
    accentLight: "#c9a84c",
  },
  {
    id: 4,
    src: "/library-04.jpg",
    label: "04 — Editorial",
    title: "Void Magazine",
    sub: "Editorial Design / Typography",
    accentLight: "#8a7a65",
  },
  {
    id: 5,
    src: "/library-05.jpg",
    label: "05 — Motion Reel",
    title: "Kinetic Archive",
    sub: "Motion Design / Visual Systems",
    accentLight: "#c9a84c",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = track.querySelectorAll<HTMLElement>(".gallery-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 40%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="2.5"
      className="relative overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Progress dots */}
      <ProgressDots total={GALLERY_IMAGES.length} sectionRef={sectionRef} trackRef={trackRef} />

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full items-center gap-4 pl-[6vw] pr-[6vw] sm:gap-6 sm:pl-[8vw] sm:pr-[8vw]"
        style={{ width: "max-content" }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <GalleryCard key={img.id} img={img} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Individual card ─────────────────────────────────────────────────────── */
function GalleryCard({
  img,
  index,
}: {
  img: (typeof GALLERY_IMAGES)[number];
  index: number;
}) {
  const accent = img.accentLight;

  // 4:3 matches the images' native 3000×2250 ratio exactly
  const cardStyle: React.CSSProperties = {
    width: "clamp(260px, 72vw, 880px)",
    aspectRatio: "4 / 3",
  };

  return (
    <div
      className="gallery-card relative flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-[2rem]"
      style={cardStyle}
    >
      {/* ── Photo background ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.title}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlays — bottom-heavy so text is always legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* Subtle warm tint to tie into the site palette */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accent}55, transparent 60%)`,
        }}
      />

      {/* Watermark number — very faint over the photo */}
      <div
        className="pointer-events-none absolute -right-2 -bottom-6 font-black leading-none select-none"
        style={{
          fontSize: "clamp(4rem, 18vw, 16rem)",
          color: "rgba(255,255,255,0.06)",
          letterSpacing: "-0.1em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8 md:p-10 lg:p-12">

        {/* Top row */}
        <div className="flex items-start justify-between">
          <p
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/60"
          >
            {img.label}
          </p>
          <div
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center flex-shrink-0"
            style={{ borderColor: `${accent}80` }}
          >
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ background: accent }} />
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <p className="mb-2 text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/55">
            {img.sub}
          </p>
          <h3
            className="font-black uppercase leading-[0.88] tracking-[-0.04em] sm:tracking-[-0.06em] text-white"
            style={{ fontSize: "clamp(1.4rem, 4.5vw, 4.5rem)" }}
          >
            {img.title}
          </h3>

          {/* CTA */}
          <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3">
            <div
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border flex-shrink-0 transition-transform duration-300 hover:scale-110"
              style={{ borderColor: `${accent}80`, background: `${accent}25` }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
              View project
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Progress dots ───────────────────────────────────────────────────────── */
function ProgressDots({
  total,
  sectionRef,
  trackRef,
}: {
  total: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: true,
        onUpdate: (self) => {
          const activeIndex = Math.round(self.progress * (total - 1));
          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.opacity = i === activeIndex ? "1" : "0.25";
            dot.style.transform = i === activeIndex ? "scale(1.4)" : "scale(1)";
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total, sectionRef, trackRef]);

  return (
    <div className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
      style={{ top: "calc(50% + min(27vw, 330px) + 24px)" }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
          style={{
            background: "#c9a84c",
            opacity: i === 0 ? 1 : 0.25,
            transform: i === 0 ? "scale(1.4)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}
