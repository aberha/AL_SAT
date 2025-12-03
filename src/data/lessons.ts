import { LessonNode } from "@/types";
import { SAT_STRUCTURE } from "./sat-structure";

// Simulated mastery based on domain and lesson index (deterministic, no randomness)
function getSimulatedMastery(domainId: string, lessonIndex: number): number {
  const baseMastery: Record<string, number> = {
    "algebra": 0.78,
    "advanced-math": 0.52,
    "problem-solving": 0.68,
    "geometry-trig": 0.41,
    "information-ideas": 0.58,
    "craft-structure": 0.72,
    "expression-ideas": 0.65,
    "standard-english": 0.45,
  };
  
  const base = baseMastery[domainId] ?? 0.5;
  // Earlier lessons have higher mastery (deterministic pattern)
  const positionBonus = (4 - lessonIndex) * 0.06;
  // Add deterministic variance based on lesson index
  const variance = ((lessonIndex * 7) % 10 - 5) * 0.02;
  
  return Math.max(0.1, Math.min(0.95, base + positionBonus + variance));
}

// Deterministic read status based on lesson index
function getReadStatus(domainId: string, lessonIndex: number): boolean {
  const baseReadRate: Record<string, number> = {
    "algebra": 4,      // First 4 read
    "advanced-math": 3,
    "problem-solving": 4,
    "geometry-trig": 2,
    "information-ideas": 3,
    "craft-structure": 4,
    "expression-ideas": 3,
    "standard-english": 2,
  };
  return lessonIndex < (baseReadRate[domainId] ?? 3);
}

// Generate lessons from SAT structure with simulated progress
export const initialLessons: LessonNode[] = [
  // Math lessons
  ...SAT_STRUCTURE.math.domains.flatMap((domain) =>
    domain.lessons.map((lesson, idx) => ({
      id: lesson.id,
      section: "math" as const,
      domainId: domain.id,
      title: lesson.title,
      read: getReadStatus(domain.id, idx),
      mastery: getSimulatedMastery(domain.id, idx),
      quizCount: 5 + (idx % 4), // 5-8 questions deterministically
      readingTimeMin: lesson.readingTimeMin,
    }))
  ),
  // Reading & Writing lessons
  ...SAT_STRUCTURE.english.domains.flatMap((domain) =>
    domain.lessons.map((lesson, idx) => ({
      id: lesson.id,
      section: "reading_writing" as const,
      domainId: domain.id,
      title: lesson.title,
      read: getReadStatus(domain.id, idx),
      mastery: getSimulatedMastery(domain.id, idx),
      quizCount: 5 + (idx % 4),
      readingTimeMin: lesson.readingTimeMin,
    }))
  ),
];
