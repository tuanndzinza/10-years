"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type HeroOverviewProps = {
  logo?: React.ReactNode;
  onScrollHintClick?: () => void;
};

const MEMORY_SOURCES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
];

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  logo,
  onScrollHintClick,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const textParallaxX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const textParallaxY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const [activeImage, setActiveImage] = useState(0);
  const [imageKey, setImageKey] = useState(0);
  const lastImageChangeRef = useRef(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const images = useMemo(() => MEMORY_SOURCES, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(mx);
    mouseY.set(my);

    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const now = performance.now();
    if (now - lastImageChangeRef.current > 260) {
      lastImageChangeRef.current = now;
      setImageKey((k) => k + 1);
      setActiveImage((prev) => {
        let next = prev;
        while (next === prev && images.length > 1) {
          next = Math.floor(Math.random() * images.length);
        }
        return next;
      });
    }
  };

  const imageOffsetX = useTransform(mouseX, [-1, 1], [-28, 28]);
  const imageOffsetY = useTransform(mouseY, [-1, 1], [-20, 20]);
  const imageX = useTransform(
    imageOffsetX,
    (offset) => (cursorPos?.x ?? 0) - 80 + offset,
  );
  const imageY = useTransform(
    imageOffsetY,
    (offset) => (cursorPos?.y ?? 0) - 55 + offset,
  );

  return (
    <section
      className="relative h-screen w-screen overflow-hidden bg-[#050609] text-white"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.35),transparent_60%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.75),transparent_80%)]" />
      </motion.div>

      <div className="relative z-10 flex h-full w-full flex-col">
        <header className="flex items-start justify-between px-6 md:px-16 pt-6 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {logo ?? (
              <span className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-100">
                ZINZA
              </span>
            )}
          </motion.div>
        </header>

        <main className="w-full flex-1 px-6 md:px-16 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10 md:gap-20">
          <motion.div
            className="flex w-full flex-col justify-center"
            style={{ x: textParallaxX, y: textParallaxY }}
          >
            <div className="flex flex-col mt-6 gap-10 overflow-hidden">
              <motion.h1
                className="text-[40px] md:text-[64px] lg:text-[80px] xl:text-9xl leading-none font-semibold tracking-tight text-slate-50"
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              >
                ZINZA
              </motion.h1>
              <motion.h2
                className="flex justify-center text-[40px] md:text-[64px] lg:text-[80px] xl:text-9xl leading-none font-semibold tracking-tight text-slate-50"
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
              >
                MEMORY
              </motion.h2>
            </div>
          </motion.div>

          {cursorPos && (
            <motion.div
              key={imageKey}
              className="fixed z-50 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/80 shadow-[0_18px_50px_rgba(15,23,42,0.9)]"
              style={{
                x: imageX,
                y: imageY,
                width: 160,
                height: 110,
              }}
              initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [-2, 2, -2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.35, ease: "easeOut" },
                scale: { duration: 0.4, ease: "easeOut" },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <img
                src={images[activeImage]}
                alt="Memory"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-slate-900/40" />
            </motion.div>
          )}
        </main>

        <footer className="flex items-end justify-between px-6 md:px-16 pb-6 md:pb-8">
          <motion.p
            className="max-w-xs text-[11px] md:text-sm text-slate-400/90 flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.7 }}
          >
            Hành trình 10 năm xây dựng, đổi mới và phát triển – một kho lưu trữ
            những kỷ niệm, con người và cột mốc đã định hình Zinza.
          </motion.p>

          <motion.div
            className="flex items-center gap-3 text-sm md:text-lg font-semibold tracking-[0.18em] uppercase text-slate-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.9 }}
          >
            <span>2016 — 2026</span>
          </motion.div>
        </footer>

        <motion.button
          type="button"
          className="pointer-events-auto absolute left-1/2 bottom-4 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-slate-400/90 flex flex-col items-center gap-1"
          onClick={onScrollHintClick}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.1 }}
        >
          <span>Scroll</span>
          <motion.span
            className="flex h-5 w-px items-end justify-center overflow-hidden bg-slate-700/70"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="mb-[-2px] h-2 w-2 rotate-45 border-b border-r border-slate-200"
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};
