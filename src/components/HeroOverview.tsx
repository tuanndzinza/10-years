"use client";

import React, { useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type MemoryImage = {
  id: number;
  src: string;
  top: string;
  left: string;
  rotate: number;
  scale: number;
  depth: number;
};

const MEMORY_IMAGES: MemoryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    top: "14%",
    left: "8%",
    rotate: -6,
    scale: 0.78,
    depth: 0.9,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    top: "10%",
    left: "60%",
    rotate: 5,
    scale: 0.76,
    depth: 1.0,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    top: "38%",
    left: "34%",
    rotate: -3,
    scale: 0.82,
    depth: 1.05,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    top: "50%",
    left: "72%",
    rotate: 4,
    scale: 0.76,
    depth: 0.95,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    top: "70%",
    left: "18%",
    rotate: 2,
    scale: 0.78,
    depth: 1.0,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    top: "66%",
    left: "58%",
    rotate: -4,
    scale: 0.8,
    depth: 1.1,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=900&q=80",
    top: "22%",
    left: "35%",
    rotate: 3,
    scale: 0.72,
    depth: 0.85,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    top: "32%",
    left: "70%",
    rotate: -5,
    scale: 0.74,
    depth: 1.05,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
    top: "55%",
    left: "46%",
    rotate: 2,
    scale: 0.78,
    depth: 0.9,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a6?auto=format&fit=crop&w=900&q=80",
    top: "18%",
    left: "82%",
    rotate: -8,
    scale: 0.7,
    depth: 1.1,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1512427691650-1e0c2f9a81b3?auto=format&fit=crop&w=900&q=80",
    top: "78%",
    left: "40%",
    rotate: 6,
    scale: 0.74,
    depth: 0.95,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1520896821602-3b57c10c1999?auto=format&fit=crop&w=900&q=80",
    top: "60%",
    left: "80%",
    rotate: -2,
    scale: 0.76,
    depth: 1.05,
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1553877522-40c2bbfa5c33?auto=format&fit=crop&w=900&q=80",
    top: "30%",
    left: "20%",
    rotate: -1,
    scale: 0.7,
    depth: 0.8,
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80",
    top: "45%",
    left: "90%",
    rotate: 5,
    scale: 0.7,
    depth: 1.0,
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    top: "10%",
    left: "32%",
    rotate: 4,
    scale: 0.68,
    depth: 0.85,
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80",
    top: "82%",
    left: "65%",
    rotate: -3,
    scale: 0.72,
    depth: 0.9,
  },
];

export const HeroOverview: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const textParallaxX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const textParallaxY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    mouseX.set(rx * 2 - 1);
    mouseY.set(ry * 2 - 1);
  };

  const images = useMemo(() => MEMORY_IMAGES, []);

  return (
    <section
      className="relative h-screen w-screen overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.45),transparent_60%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7),transparent_75%)]" />
      </motion.div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-10 md:gap-16">
        <motion.div
          className="flex w-full md:w-[42%] flex-col justify-center"
          style={{ x: textParallaxX, y: textParallaxY }}
        >
          <motion.p
            className="text-[11px] md:text-xs font-mono uppercase tracking-[0.32em] text-slate-400/90"
            initial={{ opacity: 0, y: 12, letterSpacing: "0.12em" }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.32em",
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            2016 — 2026
          </motion.p>

          <div className="mt-5 space-y-2 overflow-hidden">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 26, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            >
              10 Năm
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 26, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
            >
              Dấu Ấn Zinza
            </motion.h2>
          </div>

          <motion.p
            className="mt-5 max-w-md text-sm md:text-base text-slate-300/90 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.3 }}
          >
            Hành trình 10 năm xây dựng, đổi mới và phát triển – ghi lại những
            khoảnh khắc, con người và sản phẩm đã tạo nên Zinza hôm nay.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-400/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.8 }}
          >
            <span>↓ Scroll to explore</span>
            <motion.span
              className="flex h-4 w-px items-end justify-center overflow-hidden bg-slate-700/70"
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
          </motion.div>
        </motion.div>

        <div className="relative hidden md:block w-[58%] h-full">
          {images.map((img) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imgParallaxX = useTransform(
              mouseX,
              [-1, 1],
              [-18 * img.depth, 18 * img.depth],
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imgParallaxY = useTransform(
              mouseY,
              [-1, 1],
              [-12 * img.depth, 12 * img.depth],
            );

            return (
              <motion.div
                key={img.id}
                className="absolute rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/80 shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
                style={{
                  top: img.top,
                  left: img.left,
                  x: imgParallaxX,
                  y: imgParallaxY,
                  width: "180px",
                  height: "120px",
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: img.rotate - 4 }}
                animate={{
                  opacity: 1,
                  scale: img.scale,
                  rotate: [
                    img.rotate - 1.2,
                    img.rotate + 1.2,
                    img.rotate - 1.2,
                  ],
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 1.4 + img.id * 0.08 },
                  scale: {
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 1.4 + img.id * 0.08,
                  },
                  rotate: {
                    duration: 8 + img.id,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 9 + img.id,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <img
                  src={img.src}
                  alt="Memory"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-slate-900/40" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 w-full md:hidden">
          <div className="relative h-56 w-full">
            {images.slice(0, 4).map((img) => (
              <motion.div
                key={img.id}
                className="absolute rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/80 shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
                style={{
                  top: img.top,
                  left: img.left,
                  transform: "translate(-10%, -10%)",
                  rotate: img.rotate,
                  scale: img.scale * 0.9,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: img.scale * 0.9 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: 1.4 + img.id * 0.08,
                }}
              >
                <img
                  src={img.src}
                  alt="Memory"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-slate-900/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
