"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2026: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2026}
      id="year-2026"
      subtitle={subtitle ?? "Looking forward while honoring the journey."}
    />
  );
};

