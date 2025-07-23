// src/components/Experience.tsx
"use client";
import { ExperienceRoot } from "@contentful/experiences-sdk-react";
import React from "react";
import "@/config";

const Experience = ({ experienceJSON, locale }) => {
  return <ExperienceRoot experience={experienceJSON} locale={locale} />;
};

export default Experience;
