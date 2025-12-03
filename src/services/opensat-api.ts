import { Question } from "@/types";
import { API_DOMAIN_TO_ID } from "@/data/sat-structure";

const OPENSAT_API_URL = "https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5";

// OpenSAT API response types
interface OpenSATQuestion {
  id: string;
  domain: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  visuals?: {
    type: string;
    svg_content: string | null;
  };
  question: {
    choices: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    question: string;
    paragraph: string | null;
    explanation: string;
    correct_answer: "A" | "B" | "C" | "D";
  };
}

interface OpenSATResponse {
  math: OpenSATQuestion[];
  english: OpenSATQuestion[];
  practice_test: unknown[];
}

// Transform OpenSAT question to our Question format
function transformQuestion(opensatQ: OpenSATQuestion): Question | null {
  const domainId = API_DOMAIN_TO_ID[opensatQ.domain];
  
  if (!domainId) {
    console.warn(`Unknown domain: ${opensatQ.domain}`);
    return null;
  }

  // Combine paragraph and question into stem
  let stem = opensatQ.question.question;
  if (opensatQ.question.paragraph && opensatQ.question.paragraph !== "null") {
    stem = `${opensatQ.question.paragraph}\n\n${stem}`;
  }

  // Transform choices
  const choices = [
    { id: "a", label: opensatQ.question.choices.A },
    { id: "b", label: opensatQ.question.choices.B },
    { id: "c", label: opensatQ.question.choices.C },
    { id: "d", label: opensatQ.question.choices.D },
  ];

  return {
    id: opensatQ.id,
    domainId,
    stem,
    choices,
    correctChoiceId: opensatQ.question.correct_answer.toLowerCase(),
    explanation: opensatQ.question.explanation,
  };
}

// Cache structure
interface QuestionCache {
  byDomain: Map<string, Question[]>;
  all: Question[];
  initialized: boolean;
}

const cache: QuestionCache = {
  byDomain: new Map(),
  all: [],
  initialized: false,
};

// Fetch and organize all questions from OpenSAT API
export async function initializeOpenSATQuestions(): Promise<void> {
  if (cache.initialized) return;

  try {
    console.log("Fetching questions from OpenSAT API...");
    const response = await fetch(OPENSAT_API_URL);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: OpenSATResponse = await response.json();
    
    // Process math questions
    const mathQuestions = data.math || [];
    console.log(`Processing ${mathQuestions.length} math questions...`);
    
    mathQuestions.forEach((q) => {
      const transformed = transformQuestion(q);
      if (transformed) {
        cache.all.push(transformed);
        
        // Add to domain cache
        const existing = cache.byDomain.get(transformed.domainId) || [];
        existing.push(transformed);
        cache.byDomain.set(transformed.domainId, existing);
      }
    });

    // Process english questions
    const englishQuestions = data.english || [];
    console.log(`Processing ${englishQuestions.length} english questions...`);
    
    englishQuestions.forEach((q) => {
      const transformed = transformQuestion(q);
      if (transformed) {
        cache.all.push(transformed);
        
        const existing = cache.byDomain.get(transformed.domainId) || [];
        existing.push(transformed);
        cache.byDomain.set(transformed.domainId, existing);
      }
    });

    cache.initialized = true;
    
    // Log summary
    console.log(`OpenSAT API loaded successfully:`);
    console.log(`  Total questions: ${cache.all.length}`);
    cache.byDomain.forEach((questions, domain) => {
      console.log(`  ${domain}: ${questions.length} questions`);
    });

  } catch (error) {
    console.error("Failed to fetch from OpenSAT API:", error);
    // Don't mark as initialized so we can retry
  }
}

// Get questions by domain (returns first N questions)
export function getQuestionsByDomain(domainId: string, limit: number = 10): Question[] {
  const domainQuestions = cache.byDomain.get(domainId) || [];
  return domainQuestions.slice(0, limit);
}

// Get all questions for a domain
export function getAllQuestionsForDomain(domainId: string): Question[] {
  return cache.byDomain.get(domainId) || [];
}

// Get total count for a domain
export function getQuestionCount(domainId: string): number {
  return (cache.byDomain.get(domainId) || []).length;
}

// Check if cache is ready
export function isInitialized(): boolean {
  return cache.initialized;
}

// Get all cached questions
export function getAllQuestions(): Question[] {
  return cache.all;
}

// Get domain stats
export function getDomainStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  cache.byDomain.forEach((questions, domain) => {
    stats[domain] = questions.length;
  });
  return stats;
}
