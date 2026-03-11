"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ROLL_DURATION_MS = 2200;
const START_YEAR_OFFSET = 12;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

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
        transition={{ duration: 0.6, ease: "easeOut", delay: loaderDone ? 0.4 : 0 }}
      >
        {/* YearIntro */}
        <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
          <div className="max-w-3xl space-y-4">
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
        </section>

        {/* YearSummary */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
          <div className="max-w-4xl grid gap-8 md:grid-cols-[2fr,3fr] items-center">
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
            <div className="h-56 md:h-72 rounded-xl bg-slate-800/60 border border-slate-600/40" />
          </div>
        </section>

        {/* KeyEvents */}
        <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
          <div className="max-w-4xl space-y-8">
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
        </section>

        {/* MomentsGallery + Milestones */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 pb-24">
          <div className="max-w-5xl w-full space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Moments Gallery
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-28 md:h-32 rounded-xl bg-slate-800/80 border border-slate-600/50"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Milestones
              </p>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs md:text-sm text-slate-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <p>
                      Placeholder milestone {idx + 1} description for {year}.
                      This will be replaced with real narrative copy.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </section>
  );
};
