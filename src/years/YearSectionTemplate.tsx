"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const ROLL_DURATION_MS = 2200;
const START_YEAR_OFFSET = 12;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

const MOMENT_ITEMS = [
  {
    id: 1,
    title: "First Office Warm-up",
    location: "Hanoi, Vietnam",
    date: "2016 · Early Spring",
    category: "Team · Origins",
    author: "Internal Archive",
    description:
      "The first desks, the first whiteboard, and the feeling that something much bigger was starting to take shape.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Launch Night",
    location: "Ho Chi Minh City",
    date: "2017 · Late Summer",
    category: "Product · Launch",
    author: "Media Team",
    description:
      "Screens glowing late into the night, the first release going live, and the quiet moment right before the metrics started to move.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "All-hands in the Rain",
    location: "Da Nang Retreat",
    date: "2019 · Monsoon Season",
    category: "Culture · Offsite",
    author: "People Team",
    description:
      "A sudden storm pushed everyone under one roof — the best conversations of the year happened in that crowded, rain-soaked room.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Remote, Together",
    location: "Distributed",
    date: "2020 · New Normal",
    category: "Team · Remote",
    author: "Comms",
    description:
      "Dozens of faces in tiny squares, improvised workspaces, and the realisation that distance didn’t have to mean disconnection.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

export type YearSectionTemplateProps = {
  year: number;
  title?: string;
  subtitle?: string;
  id: string;
};

export const YearSectionTemplate: React.FC<YearSectionTemplateProps> = ({
  year,
  title,
  subtitle,
  id,
}) => {
  const [rollValue, setRollValue] = useState(year - START_YEAR_OFFSET);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const startYear = year - START_YEAR_OFFSET;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / ROLL_DURATION_MS);
      const eased = easeOutCubic(t);
      const current = Math.round(startYear + (year - startYear) * eased);
      setRollValue(Math.min(current, year));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setRollValue(year);
        setLoaderDone(true);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [year]);

  return (
    <section
      id={id}
      aria-label={`Year ${year} story`}
      className="relative min-h-screen bg-black"
    >
      {/* Loader overlay: rolls year, then fades out */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: loaderDone ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          key={rollValue}
          className="font-semibold tracking-tight text-slate-50 select-none tabular-nums"
          style={{ fontSize: "min(24vw, 20rem)", lineHeight: 1 }}
          initial={{ opacity: 0.7, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.08 }}
        >
          {rollValue}
        </motion.span>
      </motion.div>

      {/* Fixed year label: top-left (or bottom-right) */}
      <motion.div
        className="pointer-events-none fixed left-6 top-6 z-20 font-mono text-2xl md:text-3xl font-semibold text-slate-500/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaderDone ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {year}
      </motion.div>

      <motion.div
        className="relative bg-slate-950"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaderDone ? 1 : 0, y: loaderDone ? 0 : 20 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: loaderDone ? 0.4 : 0,
        }}
      >
        {/* YearIntro */}
        <motion.section
          className="sticky top-0 h-screen w-screen flex items-center justify-center bg-slate-950 px-6"
          initial={{ scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: false }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Year Intro
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Placeholder introduction for {year}.
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {subtitle ??
                "This section will eventually summarise the theme of the year and orient the viewer."}
            </p>
          </div>
        </motion.section>

        {/* YearSummary */}
        <motion.section
          className="sticky top-0 h-screen w-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6"
          initial={{ scale: 0.9, rotate: 3, y: 60, filter: "blur(12px)" }}
          whileInView={{
            scale: 1,
            rotate: 0,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: false }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Year Summary
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-50">
                Key story beats for {year}.
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                facilisis, nunc id tempus tristique, velit libero interdum nibh,
                non dignissim purus ante eget nisl. This copy exists only to
                simulate reading distance and layout.
              </p>
            </div>
            <div className="h-56 md:h-72 w-full max-w-4xl rounded-xl bg-slate-800/60 border border-slate-600/40" />
          </div>
        </motion.section>

        {/* KeyEvents */}
        <motion.section
          className="sticky top-0 h-screen w-screen flex items-center justify-center bg-slate-950 px-6"
          initial={{ scale: 0.9, rotate: -3, y: 60, filter: "blur(12px)" }}
          whileInView={{
            scale: 1,
            rotate: 0,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: false }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Key Events
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-6 space-y-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-slate-800" />
                  <h4 className="text-sm font-semibold text-slate-50">
                    Placeholder event {idx + 1}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Short description to represent a highlight or milestone from
                    this year.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* MomentsGallery + Milestones */}
        <MomentsGallerySection />
      </motion.div>
    </section>
  );
};

const MomentsGallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  // Consider section "active" when its top is near viewport top
  const isAtTop = useInView(sectionRef, {
    margin: "0px 0px -100% 0px",
  });

  return (
    <motion.section
      ref={sectionRef}
      className="sticky top-0 min-h-screen min-w-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-16 py-6"
      initial={{ scale: 0.9, rotate: 4, y: 60, filter: "blur(12px)" }}
      animate={
        isAtTop
          ? { scale: 1, rotate: 0, y: 0, filter: "blur(0px)" }
          : { scale: 0.9, rotate: 4, y: 60, filter: "blur(12px)" }
      }
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <MomentsGallery />
    </motion.section>
  );
};

const MomentsGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is closest to the top of the scroll container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cardEls = Array.from(
      el.querySelectorAll<HTMLDivElement>(".moment-card"),
    );

    const handleScroll = () => {
      const { top: containerTop } = el.getBoundingClientRect();

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardEls.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop - 80);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const active = MOMENT_ITEMS[activeIndex];

  return (
    <div ref={containerRef} className="h-full w-full space-y-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 px-1 py-3 text-center">
        Moments Gallery
      </p>

      <div className="flex w-full items-start gap-10">
        {/* Left: sticky metadata */}
        <div className="w-1/4 sticky top-0 self-start min-h-screen flex flex-col justify-center space-y-3 text-xs md:text-sm text-slate-300">
          <div>
            <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px] mb-1.5">
              Author
            </p>
            <p className="font-medium text-slate-100">{active.author}</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px] mb-1.5">
              Location
            </p>
            <p>{active.location}</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px] mb-1.5">
              Date
            </p>
            <p>{active.date}</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px] mb-1.5">
              Category
            </p>
            <p>{active.category}</p>
          </div>
        </div>

        <div className="w-2/4 relative flex flex-col gap-80 py-32">
          {MOMENT_ITEMS.map((item, index) => {
            const topOffset = 80 + index * 30;

            return (
              <div key={item.id} className="moment-card relative">
                <motion.div
                  className="sticky mx-auto h-auto max-w-3xl rounded-xl overflow-hidden border border-slate-600/60 bg-slate-900/90 shadow-[0_22px_40px_rgba(15,23,42,0.9)]"
                  style={{ top: topOffset }}
                  initial={{ opacity: 0.6, scale: 0.95, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ root: containerRef, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="h-full w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-slate-900/40" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Right: sticky description */}
        <div className="w-1/4 sticky top-0 self-start min-h-screen flex flex-col justify-center space-y-3 text-xs md:text-sm text-slate-300">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
            Moment {activeIndex + 1} / {MOMENT_ITEMS.length}
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-slate-50">
            {active.title}
          </h3>
          <p className="leading-relaxed">{active.description}</p>
          <p className="text-[11px] text-slate-500">
            Scroll this gallery to move through stacked memories.
          </p>
        </div>
      </div>
    </div>
  );
};
