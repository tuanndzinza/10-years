"use client";

import React from "react";
import { motion } from "framer-motion";

type TimelineIndicatorProps = {
  years: number[];
  activeYear: number | null;
};

export const TimelineIndicator: React.FC<TimelineIndicatorProps> = ({
  years,
  activeYear,
}) => {
  return (
    <div className="pointer-events-none fixed left-4 top-1/2 z-40 -translate-y-1/2 hidden md:block">
      <div className="relative pl-4">
        <div className="absolute left-1 top-0 bottom-0 w-px bg-slate-700/60" />
        <ul className="space-y-2 text-xs font-mono text-slate-500">
          {years.map((year) => {
            const isActive = activeYear === year;
            return (
              <motion.li
                key={year}
                className="relative flex items-center gap-2"
                initial={false}
                animate={{
                  color: isActive ? "#e5f2ff" : "#64748b",
                  opacity: isActive ? 1 : 0.6,
                  x: isActive ? 4 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                      : "bg-slate-600"
                  }`}
                />
                <span>{year}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

