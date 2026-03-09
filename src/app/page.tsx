"use client";

import React, { useEffect, useRef, useState } from "react";
import { MemoryLoader } from "@/components/MemoryLoader";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { HeroOverview } from "@/components/HeroOverview";
import { CEOMessage } from "@/components/CEOMessage";
import { TimelineOverview } from "@/components/TimelineOverview";
import { FinalReflection } from "@/components/FinalReflection";
import { TimelineIndicator } from "@/components/TimelineIndicator";
import { Year2016 } from "@/years/Year2016";
import { Year2017 } from "@/years/Year2017";
import { Year2018 } from "@/years/Year2018";
import { Year2019 } from "@/years/Year2019";
import { Year2020 } from "@/years/Year2020";
import { Year2021 } from "@/years/Year2021";
import { Year2022 } from "@/years/Year2022";
import { Year2023 } from "@/years/Year2023";
import { Year2024 } from "@/years/Year2024";
import { Year2025 } from "@/years/Year2025";
import { Year2026 } from "@/years/Year2026";

type SectionConfig =
  | { id: string; type: "hero" | "ceo" | "timeline" | "final" }
  | { id: string; type: "year"; year: number };

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [activeYear, setActiveYear] = useState<number | null>(2016);
  const isAnimatingRef = useRef(false);

  const sections: SectionConfig[] = [
    { id: "hero", type: "hero" },
    { id: "ceo", type: "ceo" },
    { id: "timeline", type: "timeline" },
    { id: "year-2016", type: "year", year: 2016 },
    { id: "year-2017", type: "year", year: 2017 },
    { id: "year-2018", type: "year", year: 2018 },
    { id: "year-2019", type: "year", year: 2019 },
    { id: "year-2020", type: "year", year: 2020 },
    { id: "year-2021", type: "year", year: 2021 },
    { id: "year-2022", type: "year", year: 2022 },
    { id: "year-2023", type: "year", year: 2023 },
    { id: "year-2024", type: "year", year: 2024 },
    { id: "year-2025", type: "year", year: 2025 },
    { id: "year-2026", type: "year", year: 2026 },
    { id: "final", type: "final" },
  ];

  const yearsOnly = sections.filter(
    (s): s is Extract<SectionConfig, { type: "year" }> => s.type === "year",
  );

  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveSection(index);
    const sec = sections[index];
    const hash = `#${sec.id}`;
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", hash);
    }
    if (sec.type === "year") {
      setActiveYear(sec.year);
    }
    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 750);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      const initialIndex = sections.findIndex((s) => s.id === initialHash);
      if (initialIndex >= 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveSection(initialIndex);
        const sec = sections[initialIndex];
        if (sec.type === "year") {
          setActiveYear(sec.year);
        }
      }
    }

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const restoreScroll = () => {
      document.body.style.overflow = "";
    };
    disableScroll();
    return restoreScroll;
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const deltaY = event.deltaY;
    if (isAnimatingRef.current) return;
    if (deltaY > 30) {
      goToSection(activeSection + 1);
    } else if (deltaY < -30) {
      goToSection(activeSection - 1);
    }
  };

  const handleYearScroll = (
    direction: "up" | "down",
    canLeave: boolean,
    yearIndex: number,
  ) => {
    if (!canLeave) return;
    if (direction === "down") {
      goToSection(yearIndex + 1);
    } else {
      goToSection(yearIndex - 1);
    }
  };

  const renderSection = (config: SectionConfig, index: number) => {
    const isActive = index === activeSection;
    if (config.type === "hero") {
      return (
        <section key={config.id} className="h-screen w-screen flex-shrink-0">
          <HeroOverview />
        </section>
      );
    }
    if (config.type === "ceo") {
      return (
        <section key={config.id} className="h-screen w-screen flex-shrink-0">
          <CEOMessage />
        </section>
      );
    }
    if (config.type === "timeline") {
      return (
        <section key={config.id} className="h-screen w-screen flex-shrink-0">
          <TimelineOverview />
        </section>
      );
    }
    if (config.type === "final") {
      return (
        <section key={config.id} className="h-screen w-screen flex-shrink-0">
          <FinalReflection />
        </section>
      );
    }
    if (config.type !== "year") return null;

    const YearComponent = (() => {
      switch (config.year) {
        case 2016:
          return Year2016;
        case 2017:
          return Year2017;
        case 2018:
          return Year2018;
        case 2019:
          return Year2019;
        case 2020:
          return Year2020;
        case 2021:
          return Year2021;
        case 2022:
          return Year2022;
        case 2023:
          return Year2023;
        case 2024:
          return Year2024;
        case 2025:
          return Year2025;
        case 2026:
          return Year2026;
        default:
          return Year2016;
      }
    })();

    return (
      <section
        key={config.id}
        className="h-screen w-screen flex-shrink-0 bg-black"
      >
        <YearSlide
          isActive={isActive}
          onEdgeScroll={(direction, canLeave) =>
            handleYearScroll(direction, canLeave, index)
          }
        >
          <YearComponent />
        </YearSlide>
      </section>
    );
  };

  return (
    <>
      {showLoader && (
        <MemoryLoader
          onFinish={() => {
            setShowLoader(false);
          }}
        />
      )}

      <TimelineIndicator
        years={yearsOnly.map((y) => y.year)}
        activeYear={activeYear}
      />

      <motion.main
        className="h-screen w-screen bg-[#020617] text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="h-full w-full overflow-hidden" onWheel={handleWheel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={sections[activeSection].id}
              className="h-screen w-screen"
              initial={{
                opacity: 0,
                scale: 1.03,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                filter: "blur(10px)",
              }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              {renderSection(sections[activeSection], activeSection)}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </>
  );
}

type YearSlideProps = {
  isActive: boolean;
  onEdgeScroll: (direction: "up" | "down", canLeave: boolean) => void;
  children: React.ReactNode;
};

const YearSlide: React.FC<YearSlideProps> = ({
  isActive,
  onEdgeScroll,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isActive) return;
    const el = containerRef.current;
    if (!el) return;

    const deltaY = event.deltaY;
    const atTop = el.scrollTop <= 0;
    const atBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

    if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
      event.preventDefault();
      const target = el.scrollTop + deltaY;
      gsap.to(el, {
        scrollTop: target,
        duration: 0.6,
        ease: "power3.out",
      });
      return;
    }

    if (deltaY > 0 && atBottom) {
      event.preventDefault();
      onEdgeScroll("down", true);
    } else if (deltaY < 0 && atTop) {
      event.preventDefault();
      onEdgeScroll("up", true);
    }
  };

  return (
    <div className="h-full w-full" onWheel={handleWheel}>
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden"
      >
        {children}
      </div>
    </div>
  );
};
