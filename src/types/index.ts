// Type definitions for SAT Dashboard

export interface LessonNode {
  id: string;
  section: "reading_writing" | "math";
  domainId: string;
  title: string;
  read: boolean;
  mastery: number; // 0–1
  quizCount: number;
  readingTimeMin: number;
}

export interface DomainMastery {
  domainId: string;
  title: string;
  section: "reading_writing" | "math";
  mastery: number; // 0–1
  totalQuestions: number;
  correctQuestions: number;
}

export interface Question {
  id: string;
  domainId: string;
  stem: string;
  choices: { id: string; label: string }[];
  correctChoiceId: string;
  explanation: string;
}

export interface StudyPlanDay {
  date: string;
  label: string;
  totalMinutes: number;
  tasks: { title: string; minutes: number }[];
}

export interface MemoryState {
  strength: number;
  reviewCount: number;
}

export interface AnswerRecord {
  questionId: string;
  domainId: string;
  correct: boolean;
}

export interface ActivityItem {
  id: string;
  type: "lesson_completed" | "review" | "quiz_passed" | "answer_correct" | "practice_test";
  description: string;
  timestamp: string;
}

export interface DashboardState {
  lessons: LessonNode[];
  memory: MemoryState;
  domains: DomainMastery[];
  quizSession: AnswerRecord[];
  studyPlan: StudyPlanDay[];
  activities: ActivityItem[];
  readinessPercent: number;
  predictedScoreLow: number;
  predictedScoreHigh: number;
}

