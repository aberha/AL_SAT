import { StudyPlanDay } from "@/types";
import { SAT_STRUCTURE } from "./sat-structure";

// Generate study plan based on SAT structure lessons
export const examDate = "Friday, June 14th";

// Helper to get lessons from structure
const mathLessons = SAT_STRUCTURE.math.domains.flatMap((d) => 
  d.lessons.map((l) => ({ ...l, domain: d.title }))
);
const englishLessons = SAT_STRUCTURE.english.domains.flatMap((d) => 
  d.lessons.map((l) => ({ ...l, domain: d.title }))
);

export const initialStudyPlan: StudyPlanDay[] = [
  {
    date: "2024-06-09",
    label: "Today",
    totalMinutes: 45,
    tasks: [
      { title: `${mathLessons[14]?.title || "Basic Probability"}`, minutes: 16 },
      { title: `${mathLessons[13]?.title || "Mean, Median, Mode"}`, minutes: 15 },
      { title: `${mathLessons[12]?.title || "Data Interpretation"}`, minutes: 14 },
    ],
  },
  {
    date: "2024-06-10",
    label: "Tomorrow",
    totalMinutes: 35,
    tasks: [
      { title: `${mathLessons[5]?.title || "Quadratic Equations"}`, minutes: 20 },
      { title: `${mathLessons[6]?.title || "Polynomial Operations"}`, minutes: 15 },
    ],
  },
  {
    date: "2024-06-11",
    label: "Wednesday",
    totalMinutes: 47,
    tasks: [
      { title: `${mathLessons[7]?.title || "Exponential Functions"}`, minutes: 15 },
      { title: `${mathLessons[8]?.title || "Rational Expressions"}`, minutes: 22 },
      { title: `${englishLessons[0]?.title || "Central Ideas"}`, minutes: 10 },
    ],
  },
  {
    date: "2024-06-12",
    label: "Thursday",
    totalMinutes: 52,
    tasks: [
      { title: `${englishLessons[1]?.title || "Supporting Evidence"}`, minutes: 14 },
      { title: `${englishLessons[5]?.title || "Words in Context"}`, minutes: 14 },
      { title: `${englishLessons[10]?.title || "Transitions"}`, minutes: 12 },
      { title: `${englishLessons[11]?.title || "Logical Sequence"}`, minutes: 12 },
    ],
  },
  {
    date: "2024-06-13",
    label: "Friday",
    totalMinutes: 60,
    tasks: [
      { title: "Practice Test - Math Section", minutes: 30 },
      { title: "Practice Test - R&W Section", minutes: 30 },
    ],
  },
];
