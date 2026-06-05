"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
  stagger?: number;
}

export default function WordReveal({
  text,
  className = "",
  as: Tag = "p",
  stagger = 0.04,
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const mutedColor = "rgba(90,80,69,0.28)";
  const activeColor = "rgba(26,22,18,0.92)";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLSpanElement>(".word-unit");
    if (!spans.length) return;

    // Set initial muted state
    gsap.set(spans, { color: mutedColor });

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        color: activeColor,
        stagger: stagger,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "center center",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [mutedColor, activeColor, stagger]);

  const words = text.split(" ");

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-unit inline-block" style={{ marginRight: "0.28em" }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}
