import { Question } from "@/types";
import { initializeOpenSATQuestions, getQuestionsByDomain as getFromAPI, isInitialized } from "@/services/opensat-api";

// Backup questions for fallback
const backupQuestions: Question[] = [
  { id: "bk-alg-1", domainId: "algebra", stem: "If 2x + 5 = 17, what is x?", choices: [{ id: "a", label: "4" }, { id: "b", label: "6" }, { id: "c", label: "8" }, { id: "d", label: "11" }], correctChoiceId: "b", explanation: "2x = 12, x = 6" },
  { id: "bk-adv-1", domainId: "advanced-math", stem: "What are the solutions to x² - 5x + 6 = 0?", choices: [{ id: "a", label: "2, 3" }, { id: "b", label: "-2, -3" }, { id: "c", label: "1, 6" }, { id: "d", label: "-1, -6" }], correctChoiceId: "a", explanation: "(x-2)(x-3) = 0" },
  { id: "bk-ps-1", domainId: "problem-solving", stem: "30% of what number is 45?", choices: [{ id: "a", label: "135" }, { id: "b", label: "150" }, { id: "c", label: "13.5" }, { id: "d", label: "75" }], correctChoiceId: "b", explanation: "45/0.30 = 150" },
  { id: "bk-geo-1", domainId: "geometry-trig", stem: "In a right triangle with legs 3 and 4, what is the hypotenuse?", choices: [{ id: "a", label: "5" }, { id: "b", label: "7" }, { id: "c", label: "12" }, { id: "d", label: "25" }], correctChoiceId: "a", explanation: "3² + 4² = 25 = 5²" },
];

export async function initializeQuestions(): Promise<void> {
  return initializeOpenSATQuestions();
}

export function getQuestionsByDomain(domainId: string, limit: number = 5): Question[] {
  if (isInitialized()) {
    const apiQuestions = getFromAPI(domainId, limit);
    if (apiQuestions.length > 0) return apiQuestions;
  }
  return backupQuestions.filter((q) => q.domainId === domainId).slice(0, limit);
}

export function getAllQuestions(): Question[] {
  return backupQuestions;
}

