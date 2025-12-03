import { ActivityItem } from "@/types";

export const initialActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "lesson_completed",
    description: "Completed 1.2.7 Basic Probability",
    timestamp: "2 days ago",
  },
  {
    id: "act-2",
    type: "review",
    description: "Reviewed 28 flashcards",
    timestamp: "3 days ago",
  },
  {
    id: "act-3",
    type: "quiz_passed",
    description: "Passed quiz: Linear Equations",
    timestamp: "4 days ago",
  },
  {
    id: "act-4",
    type: "lesson_completed",
    description: "Read lesson: Quadratic Equations",
    timestamp: "5 days ago",
  },
  {
    id: "act-5",
    type: "practice_test",
    description: "Completed practice test section",
    timestamp: "1 week ago",
  },
];
