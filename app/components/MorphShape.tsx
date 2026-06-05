"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

// Each path is drawn on a 200x200 viewBox, centered at 100,100
// All paths have the same number of commands so SVG morphing works smoothly
const SHAPES = {
  circle:
    "M100,20 C144.18,20 180,55.82 180,100 C180,144.18 144.18,180 100,180 C55.82,180 20,144.18 20,100 C20,55.82 55.82,20 100,20 Z",
  diamond:
    "M100,15 C100,15 185,100 185,100 C185,100 100,185 100,185 C100,185 15,100 15,100 C15,100 100,15 100,15 Z",
  hexagon:
    "M100,18 C100,18 174,59 174,100 C174,141 100,182 100,182 C100,182 26,141 26,100 C26,59 100,18 100,18 Z",
  triangle:
    "M100,16 C100,16 184,168 184,168 C184,168 16,168 16,168 C16,168 100,16 100,16 Z",
  square:
    "M28,28 C28,28 172,28 172,28 C172,28 172,172 172,172 C172,172 28,172 28,172 C28,28 28,28 28,28 Z",
};

// Which shape appears at each scroll section (0-indexed)
const SECTION_SHAPES: (keyof typeof SHAPES)[] = [
  "circle",    // hero
  "diamond",   // works
  "hexagon",   // depth
  "triangle",  // future
  "square",    // orbital
  "circle",    // reel
  "diamond",   // about
  "hexagon",   // stack
  "circle",    // contact
];

interface MorphShapeProps {
  sectionIndex: number;
}

export default function MorphShape({ sectionIndex }: MorphShapeProps) {
  const clampedIndex = Math.min(sectionIndex, SECTION_SHAPES.length - 1);
  const targetShape = SHAPES[SECTION_SHAPES[clampedIndex]];

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 18, mass: 1 });
  const smoothY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 1 });
  const translateX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const translateY = useTransform(smoothY, [-1, 1], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  // Slow rotation that reverses direction each morph
  const rotate = useMotionValue(0);
  const direction = useRef(1);
  useEffect(() => {
    direction.current *= -1;
    const ctrl = animate(rotate, rotate.get() + direction.current * 90, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => ctrl.stop();
  }, [sectionIndex]);

  // Light mode colors — amber/red
  const strokeColor = "rgba(217,4,41,0.45)";
  const fillColor = "rgba(217,4,41,0.60)";
  const strokeColorOuter = "rgba(217,4,41,0.25)";

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden
      style={{ x: translateX, y: translateY }}
    >
      {/* Outer ghost ring — larger, more transparent */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute"
        style={{
          width: "min(90vw, 90vh)",
          height: "min(90vw, 90vh)",
          rotate,
        }}
      >
        <motion.path
          d={targetShape}
          fill="none"
          stroke={strokeColorOuter}
          strokeWidth="0.5"
          animate={{ d: targetShape }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Main shape — filled + stroked */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute"
        style={{
          width: "min(72vw, 72vh)",
          height: "min(72vw, 72vh)",
          rotate: useTransform(rotate, (v) => -v * 0.6),
        }}
      >
        <motion.path
          d={targetShape}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="0.8"
          animate={{ d: targetShape }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
    </motion.div>
  );
}
