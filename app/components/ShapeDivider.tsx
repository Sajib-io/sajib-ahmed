"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ShapeVariant = "circle-right" | "arc-down" | "line-cross" | "circle-left" | "diagonal";

interface ShapeDividerProps {
  variant?: ShapeVariant;
  label?: string;
  href?: string;
}

export default function ShapeDivider({
  variant = "circle-right",
  label,
  href,
}: ShapeDividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const stroke = "rgba(201,168,76,0.35)";
  const textColor = "rgba(138,122,101,0.8)";

  const shapes: Record<ShapeVariant, React.ReactNode> = {
    "circle-right": (
      <div className="relative flex items-center justify-end py-16 px-6 md:px-10">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <svg width="320" height="320" viewBox="0 0 320 320">
            <motion.circle
              cx="160" cy="160" r="140"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.circle
              cx="160" cy="160" r="100"
              fill="none"
              stroke={stroke}
              strokeWidth="0.5"
              strokeDasharray="4 8"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={inView ? { pathLength: 1, rotate: 360 } : {}}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.circle
              cx="160" cy="160" r="6"
              fill={stroke}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
          </svg>
          {label && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.4em]"
              style={{ color: textColor }}
            >
              {label}
            </motion.p>
          )}
        </motion.div>
      </div>
    ),

    "circle-left": (
      <div className="relative flex items-center justify-start py-16 px-6 md:px-10">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <svg width="260" height="260" viewBox="0 0 260 260">
            <motion.circle
              cx="130" cy="130" r="110"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.line
              x1="20" y1="130" x2="240" y2="130"
              stroke={stroke}
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.8 }}
            />
            <motion.line
              x1="130" y1="20" x2="130" y2="240"
              stroke={stroke}
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 1.0 }}
            />
          </svg>
          {label && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.4em]"
              style={{ color: textColor }}
            >
              {label}
            </motion.p>
          )}
        </motion.div>
      </div>
    ),

    "arc-down": (
      <div className="relative overflow-hidden py-8 px-6 md:px-10">
        <motion.svg
          viewBox="0 0 1440 120"
          className="w-full"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0,60 Q360,120 720,60 Q1080,0 1440,60"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,80 Q360,140 720,80 Q1080,20 1440,80"
            fill="none"
            stroke={stroke}
            strokeWidth="0.5"
            strokeDasharray="6 12"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
          />
        </motion.svg>
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center text-[10px] uppercase tracking-[0.45em] mt-2"
            style={{ color: textColor }}
          >
            {label}
          </motion.p>
        )}
      </div>
    ),

    "line-cross": (
      <div className="relative flex items-center justify-center py-12 px-6 md:px-10">
        <div className="relative w-full max-w-7xl">
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-[1px]"
            style={{ background: stroke }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {label && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative z-10 mx-auto w-fit px-6 py-2"
              style={{
                background: "#f6f3ee",
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.5em]"
                style={{ color: textColor }}
              >
                {label}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    ),

    diagonal: (
      <div className="relative overflow-hidden py-6 px-6 md:px-10">
        <motion.svg
          viewBox="0 0 1440 80"
          className="w-full"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.line
            x1="0" y1="70" x2="1440" y2="10"
            stroke={stroke}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.line
            x1="0" y1="50" x2="1440" y2="30"
            stroke={stroke}
            strokeWidth="0.5"
            strokeDasharray="8 16"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
          />
        </motion.svg>
      </div>
    ),
  };

  return (
    <div ref={ref} className="pointer-events-none select-none">
      {shapes[variant]}
    </div>
  );
}
