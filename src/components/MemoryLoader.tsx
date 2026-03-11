/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type MemoryLoaderProps = {
  onFinish?: () => void;
};

type Phase = "scatter" | "gather" | "focus" | "outro";

type MemoryCard = {
  id: number;
  src: string;
  startX: number;
  startY: number;
  startRot: number;
  targetX: number;
  targetY: number;
  targetRot: number;
  delay: number;
};

const IMAGE_SOURCES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
];

const SCATTER_DURATION = 1.3;
const GATHER_DURATION = 1.8;
const FOCUS_HOLD = 3.0;
const OUTRO_DURATION = 1.0;
const TOTAL_DURATION =
  SCATTER_DURATION + GATHER_DURATION + FOCUS_HOLD + OUTRO_DURATION;

const TITLE_TEXT = "10 Năm – Dấu Ấn Zinza";

export const MemoryLoader: React.FC<MemoryLoaderProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<Phase>("scatter");
  const [typedText, setTypedText] = useState("");
  const [cards, setCards] = useState<MemoryCard[]>([]);

  // Generate card layout only on the client to avoid SSR/client randomness mismatch
  useEffect(() => {
    const count = 26;
    const result: MemoryCard[] = [];

    const onePoints: { x: number; y: number }[] = [];
    const oneX = 40;
    for (let i = 0; i < 8; i += 1) {
      onePoints.push({ x: oneX, y: 30 + i * 5 });
      if (i > 0 && i < 7) {
        onePoints.push({ x: oneX + 4, y: 30 + i * 5 });
      }
    }

    const zeroCenter = { x: 62, y: 50 };
    const zeroRadiusX = 10;
    const zeroRadiusY = 16;
    const zeroAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const zeroPoints = zeroAngles.map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return {
        x: zeroCenter.x + Math.cos(rad) * zeroRadiusX,
        y: zeroCenter.y + Math.sin(rad) * zeroRadiusY,
      };
    });

    const shapePoints = [...onePoints, ...zeroPoints];

    for (let i = 0; i < count; i += 1) {
      const src = IMAGE_SOURCES[i % IMAGE_SOURCES.length];
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const startRot = -12 + Math.random() * 24;
      const target = shapePoints[i % shapePoints.length];
      const targetRot = -8 + Math.random() * 16;
      const delay = Math.random() * 0.4;

      result.push({
        id: i,
        src,
        startX,
        startY,
        startRot,
        targetX: target.x,
        targetY: target.y,
        targetRot,
        delay,
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCards(result);
  }, []);

  useEffect(() => {
    const scatterTimeout = window.setTimeout(
      () => setPhase("gather"),
      SCATTER_DURATION * 1000,
    );
    const focusTimeout = window.setTimeout(
      () => setPhase("focus"),
      (SCATTER_DURATION + GATHER_DURATION) * 1000,
    );
    const outroTimeout = window.setTimeout(
      () => setPhase("outro"),
      (SCATTER_DURATION + GATHER_DURATION + FOCUS_HOLD) * 1000,
    );
    const finishTimeout = window.setTimeout(() => {
      onFinish?.();
    }, TOTAL_DURATION * 1000);

    return () => {
      window.clearTimeout(scatterTimeout);
      window.clearTimeout(focusTimeout);
      window.clearTimeout(outroTimeout);
      window.clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  useEffect(() => {
    if (phase !== "focus") return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(TITLE_TEXT.slice(0, index));
      if (index >= TITLE_TEXT.length) {
        window.clearInterval(interval);
      }
    }, 110);

    return () => window.clearInterval(interval);
  }, [phase]);

  const isOutro = phase === "outro";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#050509]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isOutro ? 0 : 1 }}
      transition={{ duration: OUTRO_DURATION, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.15),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.25),transparent_60%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6),transparent_80%)]" />

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.95)_100%)]" />

        <div className="relative h-full w-full">
          {cards.map((card) => {
            const isGathering =
              phase === "gather" || phase === "focus" || phase === "outro";
            return (
              <motion.div
                key={card.id}
                className="absolute w-28 h-20 sm:w-32 sm:h-24 md:w-36 md:h-26 rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.9)] border border-slate-700/70 bg-slate-900/90"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: card.startRot,
                  left: `${card.startX}%`,
                  top: `${card.startY}%`,
                }}
                animate={
                  isGathering
                    ? {
                        opacity: 1,
                        scale: 1,
                        left: `${card.targetX}%`,
                        top: `${card.targetY}%`,
                        rotate: card.targetRot,
                      }
                    : {
                        opacity: 1,
                        scale: 1,
                        left: `${card.startX}%`,
                        top: `${card.startY}%`,
                        rotate: card.startRot,
                        y: [0, -4, 0],
                      }
                }
                transition={{
                  duration: isGathering ? GATHER_DURATION : 3.2,
                  ease: "easeInOut",
                  delay: card.delay,
                  repeat: isGathering ? 0 : Infinity,
                  repeatType: "reverse",
                }}
              >
                <img
                  src={card.src}
                  alt="Memory"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-slate-900/40" />
              </motion.div>
            );
          })}

          {phase === "focus" && (
            <>
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 sm:h-80 sm:w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.7),transparent_70%)]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.8, scale: 1.1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <p className="px-4 text-3xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-100">
                  {typedText}
                  <span className="inline-block w-3 align-middle">
                    <motion.span
                      className="inline-block h-5 w-full translate-y-[3px] bg-slate-200/90"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    />
                  </span>
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
