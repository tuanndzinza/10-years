"use client";

import React from "react";
import { motion } from "framer-motion";

export const TimelineOverview: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 text-center md:text-left">
          Timeline Overview
        </p>
        <h2 className="mt-4 text-center md:text-left text-3xl md:text-4xl font-semibold text-slate-50">
          Ten chapters. One continuous story.
        </h2>
        <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
          Each year from 2016 to 2026 will have its own chapter in this
          experience. Below we&apos;ll prototype how the years connect — how
          the story flows from one milestone to the next as the viewer scrolls.
        </p>
      </motion.div>
    </section>
  );
};

