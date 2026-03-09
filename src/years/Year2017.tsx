"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2017: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2017}
      id="year-2017"
      subtitle={subtitle ?? "From early traction to a clearer direction."}
    />
  );
};

