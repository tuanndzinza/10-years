"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2023: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2023}
      id="year-2023"
      subtitle={subtitle ?? "A major inflection point and new horizons."}
    />
  );
};

