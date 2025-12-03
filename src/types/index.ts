// Type definitions for SAT Dashboard

export interface LessonNode {
  id: string;
  section: "reading_writing" | "math";
  title: string;
  read: boolean;
  mastery: number; // 0–1
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

