"use client";

import React from "react";
import { motion } from "framer-motion";

export const FinalReflection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <motion.div
        className="max-w-3xl text-center md:text-left space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Final Reflection
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-50">
          The decade behind us is the launch pad for the decade ahead.
        </h2>
        <p className="text-slate-300 leading-relaxed">
          This placeholder section will eventually summarise the entire journey
          — connecting the early chapters to the most recent milestones and
          setting up a call to action. For now, it exists to test pacing and
          the feeling of &quot;arriving&quot; at the end of the story.
        </p>
      </motion.div>
    </section>
  );
};

