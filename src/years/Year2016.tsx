"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2016: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2016}
      id="year-2016"
      subtitle={subtitle ?? "Foundations, experiments, and first prototypes."}
    />
  );
};

