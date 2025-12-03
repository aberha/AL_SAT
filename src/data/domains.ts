import { DomainMastery } from "@/types";

export const initialDomains: DomainMastery[] = [
  // Reading & Writing
  { domainId: "information-ideas", title: "Information & Ideas", section: "reading_writing", mastery: 0.58, totalQuestions: 50, correctQuestions: 29 },
  { domainId: "craft-structure", title: "Craft & Structure", section: "reading_writing", mastery: 0.72, totalQuestions: 45, correctQuestions: 32 },
  { domainId: "expression-ideas", title: "Expression of Ideas", section: "reading_writing", mastery: 0.65, totalQuestions: 35, correctQuestions: 23 },
  { domainId: "standard-english", title: "Standard English Conventions", section: "reading_writing", mastery: 0.45, totalQuestions: 40, correctQuestions: 18 },
  // Math
  { domainId: "algebra", title: "Algebra", section: "math", mastery: 0.78, totalQuestions: 55, correctQuestions: 43 },
  { domainId: "advanced-math", title: "Advanced Math", section: "math", mastery: 0.52, totalQuestions: 48, correctQuestions: 25 },
  { domainId: "problem-solving", title: "Problem Solving & Data Analysis", section: "math", mastery: 0.68, totalQuestions: 42, correctQuestions: 29 },
  { domainId: "geometry-trig", title: "Geometry & Trigonometry", section: "math", mastery: 0.41, totalQuestions: 38, correctQuestions: 16 },
];

