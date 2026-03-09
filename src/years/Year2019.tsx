"use client";

import React from "react";
import { YearSectionTemplate } from "./YearSectionTemplate";

type Props = {
  subtitle?: string;
};

export const Year2019: React.FC<Props> = ({ subtitle }) => {
  return (
    <YearSectionTemplate
      year={2019}
      id="year-2019"
      subtitle={subtitle ?? "Scaling the product and the team."}
    />
  );
};

