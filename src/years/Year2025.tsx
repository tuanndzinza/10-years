"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2025: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2025}
      id="year-2025"
      subtitle={subtitle ?? "Preparing for the next decade of growth."}
    />
  );
};

