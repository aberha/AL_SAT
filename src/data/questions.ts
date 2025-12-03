import { Question } from "@/types";
import {
  initializeOpenSATQuestions,
  getQuestionsByDomain as getFromAPI,
  isInitialized,
} from "@/services/opensat-api";

// Backup questions for each domain (used if API fails)
const backupQuestions: Question[] = [
  // Algebra
  {
    id: "backup-alg-1",
    domainId: "algebra",
    stem: "If 2x + 5 = 17, what is the value of x?",
    choices: [
      { id: "a", label: "4" },
      { id: "b", label: "6" },
      { id: "c", label: "8" },
      { id: "d", label: "11" },
    ],
    correctChoiceId: "b",
    explanation: "2x + 5 = 17 → 2x = 12 → x = 6",
  },
  {
    id: "backup-alg-2",
    domainId: "algebra",
    stem: "What is the slope of the line y = 3x - 7?",
    choices: [
      { id: "a", label: "-7" },
      { id: "b", label: "-3" },
      { id: "c", label: "3" },
      { id: "d", label: "7" },
    ],
    correctChoiceId: "c",
    explanation: "In y = mx + b form, m is the slope. Here m = 3.",
  },
  // Advanced Math
  {
    id: "backup-adv-1",
    domainId: "advanced-math",
    stem: "What are the solutions to x² - 5x + 6 = 0?",
    choices: [
      { id: "a", label: "x = 2 and x = 3" },
      { id: "b", label: "x = -2 and x = -3" },
      { id: "c", label: "x = 1 and x = 6" },
      { id: "d", label: "x = -1 and x = -6" },
    ],
    correctChoiceId: "a",
    explanation: "Factor: (x-2)(x-3) = 0, so x = 2 or x = 3",
  },
  // Problem Solving
  {
    id: "backup-ps-1",
    domainId: "problem-solving",
    stem: "If 30% of a number is 45, what is the number?",
    choices: [
      { id: "a", label: "135" },
      { id: "b", label: "150" },
      { id: "c", label: "13.5" },
      { id: "d", label: "75" },
    ],
    correctChoiceId: "b",
    explanation: "0.30 × n = 45 → n = 45/0.30 = 150",
  },
  // Geometry & Trig
  {
    id: "backup-geo-1",
    domainId: "geometry-trig",
    stem: "In a right triangle with legs of length 3 and 4, what is the hypotenuse?",
    choices: [
      { id: "a", label: "5" },
      { id: "b", label: "7" },
      { id: "c", label: "12" },
      { id: "d", label: "25" },
    ],
    correctChoiceId: "a",
    explanation: "By Pythagorean theorem: 3² + 4² = 9 + 16 = 25 = 5²",
  },
  // Information & Ideas
  {
    id: "backup-ii-1",
    domainId: "information-ideas",
    stem: "According to the passage, the main reason for the study was to:",
    choices: [
      { id: "a", label: "Confirm existing theories" },
      { id: "b", label: "Investigate unexplained phenomena" },
      { id: "c", label: "Develop new technology" },
      { id: "d", label: "Train new researchers" },
    ],
    correctChoiceId: "b",
    explanation: "The passage indicates the study was designed to explore previously unexplained observations.",
  },
  // Craft & Structure
  {
    id: "backup-cs-1",
    domainId: "craft-structure",
    stem: "The author's use of 'crystalline' in line 5 primarily serves to:",
    choices: [
      { id: "a", label: "Emphasize clarity and purity" },
      { id: "b", label: "Suggest coldness" },
      { id: "c", label: "Indicate fragility" },
      { id: "d", label: "Show complexity" },
    ],
    correctChoiceId: "a",
    explanation: "'Crystalline' typically suggests clarity, transparency, and purity.",
  },
  // Expression of Ideas
  {
    id: "backup-ei-1",
    domainId: "expression-ideas",
    stem: "Which choice provides the most effective transition?",
    choices: [
      { id: "a", label: "However," },
      { id: "b", label: "Similarly," },
      { id: "c", label: "For instance," },
      { id: "d", label: "In conclusion," },
    ],
    correctChoiceId: "a",
    explanation: "The paragraph presents contrasting information, making 'However' appropriate.",
  },
  // Standard English Conventions
  {
    id: "backup-sec-1",
    domainId: "standard-english",
    stem: "The orchestra, along with the choir, _____ performing tonight.",
    choices: [
      { id: "a", label: "are" },
      { id: "b", label: "is" },
      { id: "c", label: "were" },
      { id: "d", label: "have been" },
    ],
    correctChoiceId: "b",
    explanation: "The subject is 'orchestra' (singular). 'Along with the choir' is parenthetical.",
  },
];

// Initialize questions from API on module load
let initPromise: Promise<void> | null = null;

export async function initializeQuestions(): Promise<void> {
  if (!initPromise) {
    initPromise = initializeOpenSATQuestions();
  }
  return initPromise;
}

// Get questions by domain - prefers API, falls back to backup
export function getQuestionsByDomain(domainId: string, limit: number = 5): Question[] {
  if (isInitialized()) {
    const apiQuestions = getFromAPI(domainId, limit);
    if (apiQuestions.length > 0) {
      return apiQuestions;
    }
  }
  
  // Fallback to backup questions
  return backupQuestions.filter((q) => q.domainId === domainId).slice(0, limit);
}

// Get all questions
export function getAllQuestions(): Question[] {
  if (isInitialized()) {
    const { getAllQuestions: getAll } = require("@/services/opensat-api");
    return getAll();
  }
  return backupQuestions;
}

export { backupQuestions };
