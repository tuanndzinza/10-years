"use client";

import React from "react";
import { motion } from "framer-motion";

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
  const displayTitle = title ?? `${year}`;

  return (
    <section id={id} aria-label={`Year ${year} story`}>
      {/* Cinematic year intro */}
      <section
        className="min-h-screen flex items-center justify-center bg-black"
        data-year-section
        data-year={year}
      >
        <motion.div
          className="relative text-center px-6"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5, once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Chapter
            </motion.p>
            <motion.h2
              className="mt-4 text-5xl md:text-7xl font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              {displayTitle}
            </motion.h2>
            {subtitle && (
              <motion.p
                className="mt-4 text-sm md:text-base text-slate-300 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>

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
            This section will eventually summarise the theme of the year and
            orient the viewer. For now it uses mock text to represent the
            narrative that will anchor this chapter of the story.
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
                    Placeholder milestone {idx + 1} description for {year}. This
                    will be replaced with real narrative copy.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

