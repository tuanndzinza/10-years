"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2024: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2024}
      id="year-2024"
      subtitle={subtitle ?? "Expanding the vision and deepening impact."}
    />
  );
};

