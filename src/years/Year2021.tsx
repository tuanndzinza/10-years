"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2021: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2021}
      id="year-2021"
      subtitle={subtitle ?? "Re-focusing on what matters most."}
    />
  );
};

