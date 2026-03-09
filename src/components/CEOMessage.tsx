"use client";

import React from "react";
import { motion } from "framer-motion";

export const CEOMessage: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <motion.div
        className="max-w-3xl text-center md:text-left space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          CEO Message
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-50">
          Looking back to understand how we&apos;ll move forward.
        </h2>
        <p className="text-slate-300 leading-relaxed">
          This is a placeholder for a personal message from leadership — a
          reflection on key moments, challenges, and lessons. In the final
          version, this section will combine narrative, media, and motion to
          set the tone for the journey through each year.
        </p>
      </motion.div>
    </section>
  );
};

