import { StudyPlanDay } from "@/types";

export const examDate = "Friday, June 14th";

export const initialStudyPlan: StudyPlanDay[] = [
  { date: "2024-06-09", label: "Today", totalMinutes: 45, tasks: [
    { title: "Linear Equations Review", minutes: 15 },
    { title: "Practice Problems", minutes: 20 },
    { title: "Quiz: Algebra", minutes: 10 },
  ]},
  { date: "2024-06-10", label: "Tomorrow", totalMinutes: 35, tasks: [
    { title: "Quadratic Equations", minutes: 20 },
    { title: "Practice Problems", minutes: 15 },
  ]},
  { date: "2024-06-11", label: "Wednesday", totalMinutes: 40, tasks: [
    { title: "Reading Comprehension", minutes: 25 },
    { title: "Vocabulary Review", minutes: 15 },
  ]},
];

