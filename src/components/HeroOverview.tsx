"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroOverview: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <motion.div
        className="max-w-4xl text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          Ten-Year Anniversary
        </p>
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-slate-50">
          A decade of building, learning, and evolving together.
        </h1>
        <p className="mt-6 text-base md:text-lg text-slate-300">
          This page is a prototype for a cinematic scroll experience that will
          tell the story of the last ten years. Content here is placeholder
          only; layout, pacing, and transitions are the focus.
        </p>
      </motion.div>
    </section>
  );
};

