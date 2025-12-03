import { DomainMastery } from "@/types";
import { SAT_STRUCTURE } from "./sat-structure";

// Generate initial domain mastery from SAT structure
export const initialDomains: DomainMastery[] = [
  // Reading & Writing Domains
  ...SAT_STRUCTURE.english.domains.map((domain) => ({
    domainId: domain.id,
    title: domain.title,
    section: "reading_writing" as const,
    mastery: getInitialMastery(domain.id),
    totalQuestions: getInitialTotal(domain.id),
    correctQuestions: getInitialCorrect(domain.id),
  })),
  // Math Domains
  ...SAT_STRUCTURE.math.domains.map((domain) => ({
    domainId: domain.id,
    title: domain.title,
    section: "math" as const,
    mastery: getInitialMastery(domain.id),
    totalQuestions: getInitialTotal(domain.id),
    correctQuestions: getInitialCorrect(domain.id),
  })),
];

// Initial mastery values (simulated student progress)
function getInitialMastery(domainId: string): number {
  const masteryMap: Record<string, number> = {
    // Reading & Writing
    "information-ideas": 0.58,
    "craft-structure": 0.72,
    "expression-ideas": 0.65,
    "standard-english": 0.45,
    // Math
    "algebra": 0.78,
    "advanced-math": 0.52,
    "problem-solving": 0.68,
    "geometry-trig": 0.41,
  };
  return masteryMap[domainId] ?? 0.5;
}

function getInitialTotal(domainId: string): number {
  const totalMap: Record<string, number> = {
    "information-ideas": 50,
    "craft-structure": 45,
    "expression-ideas": 35,
    "standard-english": 40,
    "algebra": 55,
    "advanced-math": 48,
    "problem-solving": 42,
    "geometry-trig": 38,
  };
  return totalMap[domainId] ?? 40;
}

function getInitialCorrect(domainId: string): number {
  const total = getInitialTotal(domainId);
  const mastery = getInitialMastery(domainId);
  return Math.round(total * mastery);
}
