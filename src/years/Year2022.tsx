"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2022: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2022}
      id="year-2022"
      subtitle={subtitle ?? "Momentum building and systems maturing."}
    />
  );
};

