import { LessonNode } from "@/types";

export const initialLessons: LessonNode[] = [
  // Math - Algebra
  { id: "alg-1", section: "math", domainId: "algebra", title: "Linear Equations", read: true, mastery: 0.85, quizCount: 6, readingTimeMin: 15 },
  { id: "alg-2", section: "math", domainId: "algebra", title: "Systems of Equations", read: true, mastery: 0.72, quizCount: 5, readingTimeMin: 18 },
  { id: "alg-3", section: "math", domainId: "algebra", title: "Linear Inequalities", read: false, mastery: 0.45, quizCount: 5, readingTimeMin: 16 },
  // Math - Advanced Math
  { id: "adv-1", section: "math", domainId: "advanced-math", title: "Quadratic Equations", read: true, mastery: 0.68, quizCount: 7, readingTimeMin: 20 },
  { id: "adv-2", section: "math", domainId: "advanced-math", title: "Polynomial Operations", read: false, mastery: 0.35, quizCount: 6, readingTimeMin: 18 },
  // Math - Problem Solving
  { id: "ps-1", section: "math", domainId: "problem-solving", title: "Data Interpretation", read: true, mastery: 0.75, quizCount: 5, readingTimeMin: 18 },
  { id: "ps-2", section: "math", domainId: "problem-solving", title: "Statistics", read: true, mastery: 0.62, quizCount: 6, readingTimeMin: 15 },
  // Math - Geometry
  { id: "geo-1", section: "math", domainId: "geometry-trig", title: "Triangles", read: true, mastery: 0.55, quizCount: 5, readingTimeMin: 20 },
  { id: "geo-2", section: "math", domainId: "geometry-trig", title: "Circles", read: false, mastery: 0.28, quizCount: 6, readingTimeMin: 18 },
  // Reading & Writing
  { id: "ii-1", section: "reading_writing", domainId: "information-ideas", title: "Central Ideas", read: true, mastery: 0.65, quizCount: 5, readingTimeMin: 16 },
  { id: "cs-1", section: "reading_writing", domainId: "craft-structure", title: "Words in Context", read: true, mastery: 0.78, quizCount: 6, readingTimeMin: 14 },
  { id: "ei-1", section: "reading_writing", domainId: "expression-ideas", title: "Transitions", read: true, mastery: 0.70, quizCount: 5, readingTimeMin: 12 },
  { id: "sec-1", section: "reading_writing", domainId: "standard-english", title: "Punctuation", read: false, mastery: 0.40, quizCount: 7, readingTimeMin: 16 },
];

