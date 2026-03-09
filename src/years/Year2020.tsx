"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2020: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2020}
      id="year-2020"
      subtitle={subtitle ?? "Resilience, adaptation, and remote everything."}
    />
  );
};

