"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type HeroOverviewProps = {
  onScrollHintClick?: () => void;
};

// Simple typing hook for per-line typing + blinking cursor
function useTyping(
  text: string,
  options: { delay?: number; speed?: number } = {},
): string {
  const { delay = 0, speed = 35 } = options;
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const startTimer = setTimeout(() => {
      setDisplay("");
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setDisplay(text.slice(0, i));
        if (i < text.length) {
          setTimeout(tick, speed);
        }
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [text, delay, speed]);

  return display;
}

const yearsData = [
  {
    year: "2016",
    title: "Zinza founded",
    bullets: ["First core team forms", "Vision for 10-year journey begins"],
  },
  {
    year: "2017",
    title: "First office",
    bullets: ["A small room full of ideas"],
  },
  {
    year: "2018",
    title: "Product launch",
    bullets: ["First projects go live"],
  },
  {
    year: "2019",
    title: "Team expansion",
    bullets: ["More people, more stories"],
  },
  {
    year: "2020",
    title: "Major milestone",
    bullets: ["Growing through uncertainty"],
  },
  {
    year: "2021",
    title: "New markets",
    bullets: ["Zinza steps beyond borders"],
  },
  {
    year: "2022",
    title: "Platform growth",
    bullets: ["Stronger foundations, wider impact"],
  },
  {
    year: "2023",
    title: "Global clients",
    bullets: ["Stories with partners worldwide"],
  },
  {
    year: "2024",
    title: "Innovation year",
    bullets: ["Experimenting, refining, learning"],
  },
  {
    year: "2025",
    title: "Scaling",
    bullets: ["Systems, culture, and people scale up"],
  },
  {
    year: "2026",
    title: "Today",
    bullets: ["Looking back to move forward"],
  },
];

const previewImages: Record<string, string> = {
  "2016":
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
  "2017":
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  "2018":
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  "2019":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "2020":
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "2021":
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  "2022":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  "2023":
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=1200&q=80",
  "2024":
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
  "2025":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "2026":
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
};

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  onScrollHintClick,
}) => {
  const introLine1 = useTyping("ZINZA MEMORY ARCHIVE", {
    delay: 300,
    speed: 40,
  });
  const introLine2 = useTyping("10 YEARS OF STORIES", {
    delay: 1600,
    speed: 40,
  });

  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-[#050609] text-white">
      {/* Cinematic animated background + particles */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(129,140,248,0.35), transparent 55%), radial-gradient(circle at 50% 120%, rgba(15,23,42,1), #020617)",
            backgroundSize: "160% 160%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 26,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        {/* Hovered year: full-screen low-opacity background image */}
        <AnimatePresence mode="wait">
          {hoveredYear && previewImages[hoveredYear] ? (
            <motion.div
              key={hoveredYear}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={previewImages[hoveredYear]}
                alt=""
                fill
                className="object-cover opacity-[0.42]"
                sizes="100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#050609]/60 mix-blend-darken" />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75),transparent_80%)]" />
        {/* Slow sweeping light */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, transparent 38%, rgba(148,163,184,0.12) 45%, rgba(56,189,248,0.08) 50%, rgba(129,140,248,0.06) 55%, transparent 62%, transparent 100%)",
            backgroundSize: "220% 120%",
            backgroundPosition: "0% 0%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 50%", "0% 0%"],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light bg-[linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-size-[80px_80px]" />
        <ParticlesLayer />
      </motion.div>

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top bar */}
        <header className="flex items-start justify-between px-6 2xl:px-16 pt-3 2xl:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Image src="/logo.svg" alt="ZINZA" width={100} height={100} />
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.28em] text-slate-400"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <span className="h-px w-10 bg-slate-600" />
            <span>10 YEAR LOOKBACK PROJECT</span>
          </motion.div>
        </header>

        {/* Main editorial grid */}
        <main className="flex-1 px-6 xl:px-16 xl:pb-3 2xl:pb-10 flex items-center">
          <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1.25fr)] gap-10 md:gap-14 lg:gap-20">
            {/* LEFT – Title + intro */}
            <div className="flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, y: [20, 0] }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              >
                <h1 className="font-semibold tracking-tight text-slate-50 text-[40px] md:text-[62px] lg:text-[76px] leading-tight md:leading-[1.02]">
                  <span className="block">ZINZA</span>
                  <span className="block mt-1 text-slate-200">10 YEARS</span>
                </h1>
                <p className="mt-3 text-[11px] md:text-xs tracking-[0.32em] uppercase text-slate-400/90">
                  {useTyping("2016 — 2026", { delay: 950, speed: 40 })}
                  <span className="ml-1 inline-block w-[8px] bg-slate-300/80 animate-pulse" />
                </p>
              </motion.div>

              <motion.p
                className="font-mono mt-4 max-w-md text-xs md:text-sm text-slate-300/90 leading-relaxed font-normal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 1.2 }}
              >
                Một dự án biên tập lại ký ức – không chỉ là timeline, mà là
                những mảnh ghép nhỏ tạo nên hành trình Zinza trong suốt một thập
                kỷ.
              </motion.p>

              <div className="mt-6 space-y-3 text-[11px] md:text-xs lg:text-sm tracking-[0.18em] uppercase text-slate-300/95 font-medium">
                <div className="font-mono text-[10px] md:text-xs text-sky-300/80">
                  <span className="text-slate-500">{">"}</span>{" "}
                  <span>{introLine1}</span>
                  <span className="ml-1 inline-block w-[8px] bg-sky-300/80 animate-pulse" />
                </div>
                <div className="font-mono text-[10px] md:text-xs text-sky-200/80">
                  <span className="text-slate-500">{">"}</span>{" "}
                  <span>{introLine2}</span>
                  <span className="ml-1 inline-block w-[8px] bg-sky-200/80 animate-pulse" />
                </div>
              </div>
            </div>

            {/* RIGHT – Year list with typing feel */}
            <div className="relative flex flex-col justify-center">
              <div className="border-l border-slate-700/70 pl-5 md:pl-6 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide pr-3 md:pr-4">
                {yearsData.map((entry, idx) => (
                  <YearLine
                    key={entry.year}
                    entry={entry}
                    index={idx}
                    hoveredYear={hoveredYear}
                    setHoveredYear={setHoveredYear}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Bottom meta + scroll hint */}
        <footer className="relative px-6 md:px-16 pb-6 md:pb-8 flex items-end justify-center">
          <motion.button
            type="button"
            className="pointer-events-auto relative text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-slate-400/90 flex flex-col items-center gap-1"
            onClick={onScrollHintClick}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 2.3 }}
          >
            <span>Scroll to begin</span>
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
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          </motion.button>
        </footer>
      </div>
    </section>
  );
};

type YearEntry = (typeof yearsData)[number];

const YearLine: React.FC<{
  entry: YearEntry;
  index: number;
  hoveredYear: string | null;
  setHoveredYear: (year: string | null) => void;
}> = ({ entry, index, hoveredYear, setHoveredYear }) => {
  const baseDelay = 900 + index * 260;
  const mainLine = useTyping(`${entry.year} — ${entry.title}`, {
    delay: baseDelay,
    speed: 30,
  });

  const isHovered = hoveredYear === entry.year;

  return (
    <motion.div
      className="relative space-y-1 cursor-default rounded-r-md border-l-2 border-transparent pl-3 -ml-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: baseDelay / 1000,
      }}
      onMouseEnter={() => setHoveredYear(entry.year)}
      onMouseLeave={() => setHoveredYear(null)}
    >
      <motion.div
        className="relative"
        animate={{
          x: isHovered ? 6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.p
          className="font-mono text-[11px] md:text-xs relative z-10"
          animate={{
            color: isHovered ? "rgb(125 211 252)" : "rgba(226, 232, 240, 0.95)",
            textShadow: isHovered ? "0 0 20px rgba(56, 189, 248, 0.4)" : "none",
          }}
          transition={{ duration: 0.25 }}
        >
          <span>{mainLine}</span>
          <span className="ml-1 inline-block w-[7px] bg-slate-300/80 animate-pulse" />
        </motion.p>
        {isHovered && (
          <motion.div
            className="absolute inset-0 -left-3 rounded-r-md bg-sky-500/10 border-l-2 border-sky-400/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
      {entry.bullets.map((b, bi) => (
        <motion.p
          key={`${entry.year}-${bi}`}
          className="font-mono text-[10px] md:text-[11px] pl-4"
          animate={{
            opacity: isHovered ? 1 : 0.85,
            x: isHovered ? 4 : 0,
            color: isHovered
              ? "rgba(203, 213, 225, 0.95)"
              : "rgba(148, 163, 184, 0.9)",
          }}
          transition={{ duration: 0.25, delay: isHovered ? bi * 0.04 : 0 }}
        >
          - {b}
        </motion.p>
      ))}
    </motion.div>
  );
};

// Precomputed particle configs to keep component pure
const PARTICLES: Array<{
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}> = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  top: (i * 37) % 100,
  left: (i * 59) % 100,
  duration: 5 + (i % 8),
  delay: (i * 0.7) % 6,
}));

const ParticlesLayer: React.FC = () => (
  <div className="pointer-events-none absolute inset-0">
    {PARTICLES.map((p) => (
      <motion.span
        key={p.id}
        className="absolute rounded-full bg-sky-300/70"
        style={{
          width: 6,
          height: 6,
          top: `${p.top}%`,
          left: `${p.left}%`,
          boxShadow: "0 0 12px rgba(56,189,248,0.7)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0],
          y: [-14, 8, -14],
          x: [0, 6, -4],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: p.delay,
        }}
      />
    ))}
  </div>
);
