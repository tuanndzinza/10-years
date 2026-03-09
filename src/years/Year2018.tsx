"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2018: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2018}
      id="year-2018"
      subtitle={subtitle ?? "Launching, learning from customers, iterating fast."}
    />
  );
};

