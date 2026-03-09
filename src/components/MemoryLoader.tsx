/* eslint-disable react-hooks/purity */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type MemoryLoaderProps = {
  onFinish?: () => void;
  photos?: string[];
};

type CardLayout = {
  id: number;
  photo: string;
  initialLeft: number;
  initialTop: number;
  collageLeft: number;
  collageTop: number;
  initialRotate: number;
  collageRotate: number;
  delay: number;
};

type Phase = "float" | "converge" | "exit";

const DEFAULT_PHOTOS = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80",
];

const FLOAT_DURATION = 3; // seconds
const CONVERGE_DURATION = 1.4; // seconds
const EXIT_DURATION = 0.9; // seconds

export const MemoryLoader: React.FC<MemoryLoaderProps> = ({
  onFinish,
  photos = DEFAULT_PHOTOS,
}) => {
  const [phase, setPhase] = useState<Phase>("float");
  const [showTitle, setShowTitle] = useState(false);

  const cards = useMemo<CardLayout[]>(() => {
    const usedPhotos = photos.length ? photos : DEFAULT_PHOTOS;
    const cardCount = Math.min(18, usedPhotos.length * 3);

    const collageGrid: { left: number; top: number }[] = [];
    const rows = 3;
    const cols = 4;
    const startLeft = 50 - (cols * 11) / 2;
    const startTop = 50 - (rows * 15) / 2;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        collageGrid.push({
          left: startLeft + c * 11,
          top: startTop + r * 15,
        });
      }
    }

    return Array.from({ length: cardCount }).map((_, i) => {
      const photo = usedPhotos[i % usedPhotos.length];
      const initialLeft = 10 + Math.random() * 80;
      const initialTop = 10 + Math.random() * 80;
      const initialRotate = -12 + Math.random() * 24;
      const grid = collageGrid[i % collageGrid.length];
      const collageRotate = -6 + Math.random() * 12;
      const delay = Math.random() * 0.5;

      return {
        id: i,
        photo,
        initialLeft,
        initialTop,
        collageLeft: grid.left,
        collageTop: grid.top,
        initialRotate,
        collageRotate,
        delay,
      };
    });
  }, [photos]);

  useEffect(() => {
    const floatTimeout = window.setTimeout(() => {
      setPhase("converge");
      setShowTitle(true);
    }, FLOAT_DURATION * 1000);

    const exitTimeout = window.setTimeout(
      () => {
        setPhase("exit");
        window.setTimeout(() => {
          onFinish?.();
        }, EXIT_DURATION * 1000);
      },
      (FLOAT_DURATION + CONVERGE_DURATION + 0.6) * 1000,
    );

    return () => {
      window.clearTimeout(floatTimeout);
      window.clearTimeout(exitTimeout);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#050508]"
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: phase === "exit" ? 0 : 1,
        scale: phase === "exit" ? 1.1 : 1,
      }}
      transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.22),transparent_55%)]" />

      <div className="relative h-full w-full">
        {cards.map((card) => {
          const isConverging = phase !== "float";

          const floatOffsetX = (Math.random() - 0.5) * 16;
          const floatOffsetY = (Math.random() - 0.5) * 16;

          return (
            <motion.div
              key={card.id}
              className="absolute w-32 h-20 sm:w-40 sm:h-28 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(15,23,42,0.9)] border border-white/5 bg-slate-900/80"
              style={{
                left: `${card.initialLeft}%`,
                top: `${card.initialTop}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: card.initialRotate,
              }}
              animate={
                isConverging
                  ? {
                      opacity: 1,
                      scale: 1,
                      left: `${card.collageLeft}%`,
                      top: `${card.collageTop}%`,
                      rotate: card.collageRotate,
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                      x: [0, floatOffsetX, -floatOffsetX * 0.4, 0],
                      y: [0, floatOffsetY, -floatOffsetY * 0.4, 0],
                      rotate: [
                        card.initialRotate,
                        card.initialRotate + 3,
                        card.initialRotate - 2,
                        card.initialRotate,
                      ],
                    }
              }
              transition={
                isConverging
                  ? {
                      duration: CONVERGE_DURATION,
                      ease: "easeInOut",
                      delay: card.delay,
                    }
                  : {
                      duration: FLOAT_DURATION,
                      ease: "easeInOut",
                      delay: card.delay,
                    }
              }
            >
              <div className="h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 to-slate-800/40 z-0" />
                <img
                  src={card.photo}
                  alt="Company memory"
                  className="h-full w-full object-cover relative z-10"
                />
              </div>
            </motion.div>
          );
        })}

        {showTitle && (
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="text-center px-4">
              <p className="text-xs tracking-[0.4em] text-slate-300/80 uppercase">
                10 YEARS OF JOURNEY
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
