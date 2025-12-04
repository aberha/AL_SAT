"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Question } from "@/types";
import { getAllQuestions, initializeOpenSATQuestions, isInitialized } from "@/services/opensat-api";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Play,
  RotateCcw,
  BookOpen,
  Calculator,
  Trophy,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  BarChart3,
} from "lucide-react";

// Clean up LaTeX notation for display
function cleanLatex(text: string): string {
  if (!text) return text;
  
  let cleaned = text;
  
  // Remove LaTeX delimiters first
  cleaned = cleaned
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\\(([^)]+)\\\)/g, "$1")
    .replace(/\\\[([^\]]+)\\\]/g, "$1");
  
  // Greek letters
  const greekLetters: Record<string, string> = {
    '\\pi': 'π',
    '\\theta': 'θ',
    '\\alpha': 'α',
    '\\beta': 'β',
    '\\gamma': 'γ',
    '\\delta': 'δ',
    '\\epsilon': 'ε',
    '\\varepsilon': 'ε',
    '\\zeta': 'ζ',
    '\\eta': 'η',
    '\\lambda': 'λ',
    '\\mu': 'μ',
    '\\nu': 'ν',
    '\\xi': 'ξ',
    '\\rho': 'ρ',
    '\\sigma': 'σ',
    '\\tau': 'τ',
    '\\phi': 'φ',
    '\\varphi': 'φ',
    '\\chi': 'χ',
    '\\psi': 'ψ',
    '\\omega': 'ω',
    '\\Gamma': 'Γ',
    '\\Delta': 'Δ',
    '\\Theta': 'Θ',
    '\\Lambda': 'Λ',
    '\\Xi': 'Ξ',
    '\\Pi': 'Π',
    '\\Sigma': 'Σ',
    '\\Phi': 'Φ',
    '\\Psi': 'Ψ',
    '\\Omega': 'Ω',
  };
  
  for (const [latex, unicode] of Object.entries(greekLetters)) {
    cleaned = cleaned.replace(new RegExp(latex.replace(/\\/g, '\\\\'), 'g'), unicode);
  }
  
  // Fractions
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_, num, den) => {
    return `(${cleanLatex(num)}/${cleanLatex(den)})`;
  });
  
  // Square roots
  cleaned = cleaned.replace(/\\sqrt\{([^}]+)\}/g, (_, content) => {
    return `√(${cleanLatex(content)})`;
  });
  
  // Superscripts (handle both {content} and single characters)
  cleaned = cleaned.replace(/\^(\{([^}]+)\}|(\w))/g, (_, match, braced, single) => {
    const exp = braced ? braced : single;
    return `^${cleanLatex(exp)}`;
  });
  
  // Subscripts
  cleaned = cleaned.replace(/_(\{([^}]+)\}|(\w))/g, (_, match, braced, single) => {
    const sub = braced ? braced : single;
    return `_${cleanLatex(sub)}`;
  });
  
  // Math operators and symbols
  cleaned = cleaned
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\mp/g, "∓")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\equiv/g, "≡")
    .replace(/\\cdot/g, "·")
    .replace(/\\ast/g, "∗")
    .replace(/\\star/g, "★")
    .replace(/\\circ/g, "∘")
    .replace(/\\infty/g, "∞")
    .replace(/\\sum/g, "∑")
    .replace(/\\prod/g, "∏")
    .replace(/\\int/g, "∫")
    .replace(/\\partial/g, "∂")
    .replace(/\\nabla/g, "∇")
    .replace(/\\ell/g, "ℓ")
    .replace(/\\hbar/g, "ℏ");
  
  // Text commands
  cleaned = cleaned.replace(/\\text\{([^}]+)\}/g, "$1");
  
  // Spacing commands
  cleaned = cleaned
    .replace(/\\\\/g, " ")
    .replace(/\\,/g, " ")
    .replace(/\\;/g, " ")
    .replace(/\\quad/g, "  ")
    .replace(/\\qquad/g, "    ")
    .replace(/\\hspace\{[^}]+\}/g, " ")
    .replace(/\\vspace\{[^}]+\}/g, " ");
  
  // Remove remaining backslashes before single letters (common LaTeX commands)
  cleaned = cleaned.replace(/\\([a-zA-Z])/g, "$1");
  
  // Clean up any remaining braces that might be left
  cleaned = cleaned.replace(/\{([^}]+)\}/g, "$1");
  
  return cleaned.trim();
}

// Exam configuration types
type ExamSection = "all" | "math" | "reading_writing";
type ExamMode = "setup" | "exam" | "review" | "results";

interface ExamConfig {
  section: ExamSection;
  questionCount: number;
  timeLimit: number; // in minutes, 0 = no limit
  shuffleQuestions: boolean;
}

interface ExamAnswer {
  questionId: string;
  selectedChoiceId: string | null;
  isCorrect: boolean | null;
  timeSpent: number; // seconds
  flagged: boolean;
}

interface ExamState {
  questions: Question[];
  answers: Map<string, ExamAnswer>;
  currentIndex: number;
  timeRemaining: number; // seconds
  startTime: number;
  isSubmitted: boolean;
}

// Domain mapping for display
const DOMAIN_LABELS: Record<string, { label: string; section: string }> = {
  "algebra": { label: "Algebra", section: "Math" },
  "advanced-math": { label: "Advanced Math", section: "Math" },
  "problem-solving": { label: "Problem Solving & Data Analysis", section: "Math" },
  "geometry-trig": { label: "Geometry & Trigonometry", section: "Math" },
  "information-ideas": { label: "Information & Ideas", section: "Reading & Writing" },
  "craft-structure": { label: "Craft & Structure", section: "Reading & Writing" },
  "expression-ideas": { label: "Expression of Ideas", section: "Reading & Writing" },
  "standard-english": { label: "Standard English Conventions", section: "Reading & Writing" },
};

const MATH_DOMAINS = ["algebra", "advanced-math", "problem-solving", "geometry-trig"];
const RW_DOMAINS = ["information-ideas", "craft-structure", "expression-ideas", "standard-english"];

export default function PracticeExam() {
  const [mode, setMode] = useState<ExamMode>("setup");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [config, setConfig] = useState<ExamConfig>({
    section: "all",
    questionCount: 20,
    timeLimit: 30,
    shuffleQuestions: true,
  });

  const [examState, setExamState] = useState<ExamState>({
    questions: [],
    answers: new Map(),
    currentIndex: 0,
    timeRemaining: 0,
    startTime: 0,
    isSubmitted: false,
  });

  // Load questions on mount
  useEffect(() => {
    async function loadQuestions() {
      setIsLoading(true);
      if (!isInitialized()) {
        await initializeOpenSATQuestions();
      }
      const questions = getAllQuestions();
      setAllQuestions(questions);
      setIsLoading(false);
    }
    loadQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (mode !== "exam" || examState.isSubmitted || config.timeLimit === 0) return;

    const interval = setInterval(() => {
      setExamState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto submit
          clearInterval(interval);
          return { ...prev, timeRemaining: 0, isSubmitted: true };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, examState.isSubmitted, config.timeLimit]);

  // Filter questions by section
  const getFilteredQuestions = useCallback(() => {
    let filtered = [...allQuestions];
    
    if (config.section === "math") {
      filtered = filtered.filter((q) => MATH_DOMAINS.includes(q.domainId));
    } else if (config.section === "reading_writing") {
      filtered = filtered.filter((q) => RW_DOMAINS.includes(q.domainId));
    }

    if (config.shuffleQuestions) {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    return filtered.slice(0, config.questionCount);
  }, [allQuestions, config]);

  // Start exam
  const startExam = () => {
    const questions = getFilteredQuestions();
    const answers = new Map<string, ExamAnswer>();
    
    questions.forEach((q) => {
      answers.set(q.id, {
        questionId: q.id,
        selectedChoiceId: null,
        isCorrect: null,
        timeSpent: 0,
        flagged: false,
      });
    });

    setExamState({
      questions,
      answers,
      currentIndex: 0,
      timeRemaining: config.timeLimit * 60,
      startTime: Date.now(),
      isSubmitted: false,
    });
    setMode("exam");
  };

  // Select answer
  const selectAnswer = (choiceId: string) => {
    if (examState.isSubmitted) return;
    
    const currentQuestion = examState.questions[examState.currentIndex];
    setExamState((prev) => {
      const newAnswers = new Map(prev.answers);
      const existing = newAnswers.get(currentQuestion.id)!;
      newAnswers.set(currentQuestion.id, {
        ...existing,
        selectedChoiceId: choiceId,
      });
      return { ...prev, answers: newAnswers };
    });
  };

  // Toggle flag
  const toggleFlag = () => {
    const currentQuestion = examState.questions[examState.currentIndex];
    setExamState((prev) => {
      const newAnswers = new Map(prev.answers);
      const existing = newAnswers.get(currentQuestion.id)!;
      newAnswers.set(currentQuestion.id, {
        ...existing,
        flagged: !existing.flagged,
      });
      return { ...prev, answers: newAnswers };
    });
  };

  // Navigate questions
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < examState.questions.length) {
      setExamState((prev) => ({ ...prev, currentIndex: index }));
    }
  };

  // Submit exam
  const submitExam = () => {
    setExamState((prev) => {
      const newAnswers = new Map(prev.answers);
      prev.questions.forEach((q) => {
        const answer = newAnswers.get(q.id)!;
        newAnswers.set(q.id, {
          ...answer,
          isCorrect: answer.selectedChoiceId === q.correctChoiceId,
        });
      });
      return { ...prev, answers: newAnswers, isSubmitted: true };
    });
    setMode("results");
  };

  // Calculate results
  const results = useMemo(() => {
    if (!examState.isSubmitted) return null;

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const byDomain: Record<string, { correct: number; total: number }> = {};

    examState.questions.forEach((q) => {
      const answer = examState.answers.get(q.id)!;
      
      if (!byDomain[q.domainId]) {
        byDomain[q.domainId] = { correct: 0, total: 0 };
      }
      byDomain[q.domainId].total++;

      if (answer.selectedChoiceId === null) {
        skipped++;
      } else if (answer.isCorrect) {
        correct++;
        byDomain[q.domainId].correct++;
      } else {
        incorrect++;
      }
    });

    const totalTime = config.timeLimit * 60 - examState.timeRemaining;
    const avgTimePerQuestion = totalTime / examState.questions.length;

    return {
      correct,
      incorrect,
      skipped,
      total: examState.questions.length,
      percentage: Math.round((correct / examState.questions.length) * 100),
      totalTime,
      avgTimePerQuestion,
      byDomain,
    };
  }, [examState, config.timeLimit]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Restart exam
  const restartExam = () => {
    setMode("setup");
    setExamState({
      questions: [],
      answers: new Map(),
      currentIndex: 0,
      timeRemaining: 0,
      startTime: 0,
      isSubmitted: false,
    });
  };

  // Review mode
  const enterReview = () => {
    setMode("review");
    setExamState((prev) => ({ ...prev, currentIndex: 0 }));
  };

  // Count stats - using Array.from to ensure proper reactivity with Map
  const examStats = useMemo(() => {
    let answered = 0;
    let flagged = 0;
    Array.from(examState.answers.values()).forEach((a) => {
      if (a && a.selectedChoiceId !== null) answered++;
      if (a && a.flagged) flagged++;
    });
    return { answered, flagged };
  }, [examState.answers, examState.currentIndex]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">Loading questions...</p>
        </div>
      </div>
    );
  }

  // SETUP MODE
  if (mode === "setup") {
    const mathCount = allQuestions.filter((q) => MATH_DOMAINS.includes(q.domainId)).length;
    const rwCount = allQuestions.filter((q) => RW_DOMAINS.includes(q.domainId)).length;

    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-violet-600 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Practice Exam</h1>
            <p className="text-[var(--muted-foreground)]">
              Test your knowledge with {allQuestions.length.toLocaleString()} real SAT questions
            </p>
          </div>

          {/* Question Bank Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="text-3xl font-bold text-[var(--primary)]">{allQuestions.length.toLocaleString()}</div>
              <div className="text-sm text-[var(--muted-foreground)]">Total Questions</div>
            </div>
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 text-blue-500" />
                <span className="text-3xl font-bold text-blue-500">{mathCount}</span>
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">Math</div>
            </div>
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span className="text-3xl font-bold text-emerald-500">{rwCount}</span>
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">Reading & Writing</div>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Configure Your Exam</h2>

            {/* Section Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Section</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "all", label: "Full Test", icon: Target, color: "violet" },
                  { value: "math", label: "Math Only", icon: Calculator, color: "blue" },
                  { value: "reading_writing", label: "Reading & Writing", icon: BookOpen, color: "emerald" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setConfig((c) => ({ ...c, section: opt.value as ExamSection }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.section === opt.value
                        ? `border-${opt.color}-500 bg-${opt.color}-500/10`
                        : "border-[var(--border)] hover:border-[var(--primary)]"
                    }`}
                  >
                    <opt.icon className={`w-6 h-6 mx-auto mb-2 ${config.section === opt.value ? `text-${opt.color}-500` : "text-[var(--muted-foreground)]"}`} />
                    <div className={`text-sm font-medium ${config.section === opt.value ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                Number of Questions: <span className="text-[var(--primary)]">{config.questionCount}</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={config.questionCount}
                onChange={(e) => setConfig((c) => ({ ...c, questionCount: parseInt(e.target.value) }))}
                className="w-full h-2 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
                <span>5</span>
                <span>Quick (10)</span>
                <span>Standard (20)</span>
                <span>Full (50)</span>
              </div>
            </div>

            {/* Time Limit */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                Time Limit: <span className="text-[var(--primary)]">{config.timeLimit === 0 ? "No Limit" : `${config.timeLimit} min`}</span>
              </label>
              <div className="flex gap-2">
                {[0, 15, 30, 45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setConfig((c) => ({ ...c, timeLimit: mins }))}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      config.timeLimit === mins
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]"
                    }`}
                  >
                    {mins === 0 ? "∞" : `${mins}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.shuffleQuestions}
                  onChange={(e) => setConfig((c) => ({ ...c, shuffleQuestions: e.target.checked }))}
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-[var(--foreground)]">Shuffle questions</span>
              </label>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={startExam}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[var(--primary)] to-violet-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Start Practice Exam
          </button>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-4">
            Questions sourced from the OpenSAT question bank
          </p>
        </div>
      </div>
    );
  }

  // EXAM MODE or REVIEW MODE
  if (mode === "exam" || mode === "review") {
    const currentQuestion = examState.questions[examState.currentIndex];
    const currentAnswer = examState.answers.get(currentQuestion.id)!;
    const isReview = mode === "review";

    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[var(--foreground)]">
                {isReview ? "Review Mode" : "Practice Exam"}
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">
                {DOMAIN_LABELS[currentQuestion.domainId]?.label || currentQuestion.domainId}
              </span>
            </div>

            <div className="flex items-center gap-6">
              {!isReview && config.timeLimit > 0 && (
                <div className={`flex items-center gap-2 ${examState.timeRemaining < 60 ? "text-red-500" : "text-[var(--foreground)]"}`}>
                  <Timer className="w-5 h-5" />
                  <span className="font-mono text-lg font-semibold">{formatTime(examState.timeRemaining)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <span>{examStats.answered}/{examState.questions.length} answered</span>
                {examStats.flagged > 0 && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <Flag className="w-4 h-4" /> {examStats.flagged}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Question Panel */}
          <div className="flex-1 flex flex-col overflow-auto p-6">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                  {examState.currentIndex + 1}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  of {examState.questions.length}
                </span>
              </div>
              
              {!isReview && (
                <button
                  onClick={toggleFlag}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentAnswer.flagged
                      ? "bg-amber-100 text-amber-600"
                      : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:bg-amber-50 hover:text-amber-500"
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  {currentAnswer.flagged ? "Flagged" : "Flag for review"}
                </button>
              )}
            </div>

            {/* Question Content */}
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
              <p className="text-lg text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                {cleanLatex(currentQuestion.stem)}
              </p>
            </div>

            {/* Answer Choices */}
            <div className="space-y-3 mb-6">
              {currentQuestion.choices.map((choice) => {
                const isSelected = currentAnswer.selectedChoiceId === choice.id;
                const isCorrect = choice.id === currentQuestion.correctChoiceId;
                
                let choiceStyle = "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--accent)]";
                if (isReview || examState.isSubmitted) {
                  if (isCorrect) {
                    choiceStyle = "border-emerald-500 bg-emerald-50";
                  } else if (isSelected && !isCorrect) {
                    choiceStyle = "border-red-500 bg-red-50";
                  }
                } else if (isSelected) {
                  choiceStyle = "border-[var(--primary)] bg-[var(--primary)]/10";
                }

                return (
                  <button
                    key={choice.id}
                    onClick={() => !isReview && selectAnswer(choice.id)}
                    disabled={isReview}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${choiceStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                      isSelected && !isReview
                        ? "bg-[var(--primary)] text-white"
                        : isReview && isCorrect
                        ? "bg-emerald-500 text-white"
                        : isReview && isSelected && !isCorrect
                        ? "bg-red-500 text-white"
                        : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                    }`}>
                      {choice.id.toUpperCase()}
                    </span>
                    <span className="flex-1 text-[var(--foreground)]">{cleanLatex(choice.label)}</span>
                    {isReview && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isReview && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation (Review Mode) */}
            {isReview && currentQuestion.explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                  <AlertCircle className="w-5 h-5" />
                  Explanation
                </div>
                <p className="text-blue-800">{cleanLatex(currentQuestion.explanation)}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => goToQuestion(examState.currentIndex - 1)}
                disabled={examState.currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {!isReview && examState.currentIndex === examState.questions.length - 1 ? (
                <button
                  onClick={submitExam}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
                >
                  <Check className="w-5 h-5" />
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => goToQuestion(examState.currentIndex + 1)}
                  disabled={examState.currentIndex === examState.questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="w-64 bg-[var(--card)] border-l border-[var(--border)] p-4 overflow-auto">
            <h3 className="text-sm font-medium text-[var(--foreground)] mb-4">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {examState.questions.map((q, idx) => {
                const answer = examState.answers.get(q.id);
                const isCurrent = idx === examState.currentIndex;
                const hasAnswer = answer && answer.selectedChoiceId !== null;
                const isFlagged = answer && answer.flagged;
                const isCorrectAnswer = answer && answer.isCorrect === true;
                const isIncorrectAnswer = answer && answer.selectedChoiceId !== null && answer.isCorrect === false;
                
                let bgColor = "bg-[var(--secondary)] text-[var(--foreground)]";
                if (isReview || examState.isSubmitted) {
                  if (isCorrectAnswer) {
                    bgColor = "bg-emerald-500 text-white";
                  } else if (isIncorrectAnswer) {
                    bgColor = "bg-red-500 text-white";
                  }
                } else if (hasAnswer) {
                  bgColor = "bg-[var(--primary)] text-white";
                }

                return (
                  <button
                    key={`nav-${idx}`}
                    onClick={() => goToQuestion(idx)}
                    className={`w-full aspect-square rounded-lg text-sm font-medium transition-all relative ${bgColor} ${
                      isCurrent ? "ring-2 ring-[var(--primary)] ring-offset-2" : ""
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 text-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {!isReview && (
              <button
                onClick={submitExam}
                className="w-full mt-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
              >
                Submit Exam
              </button>
            )}

            {isReview && (
              <button
                onClick={() => setMode("results")}
                className="w-full mt-6 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)] transition-colors"
              >
                Back to Results
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS MODE
  if (mode === "results" && results) {
    const scoreColor = results.percentage >= 80 ? "text-emerald-500" : results.percentage >= 60 ? "text-amber-500" : "text-red-500";

    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-[var(--card)] to-[var(--secondary)] rounded-2xl border border-[var(--border)] p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Trophy className={`w-10 h-10 ${scoreColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Exam Complete!</h2>
              <div className={`text-6xl font-bold ${scoreColor}`}>{results.percentage}%</div>
              <p className="text-[var(--muted-foreground)] mt-2">
                {results.correct} of {results.total} correct
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-emerald-500">{results.correct}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Correct</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold text-red-500">{results.incorrect}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Incorrect</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <div className="text-2xl font-bold text-gray-400">{results.skipped}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Skipped</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-blue-500">{formatTime(results.totalTime)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Total Time</div>
              </div>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Performance by Domain</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(results.byDomain).map(([domainId, stats]) => {
                const percent = Math.round((stats.correct / stats.total) * 100);
                const label = DOMAIN_LABELS[domainId];
                
                return (
                  <div key={domainId}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          {label?.label || domainId}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)] ml-2">
                          ({label?.section})
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {stats.correct}/{stats.total} ({percent}%)
                      </span>
                    </div>
                    <div className="h-3 bg-[var(--secondary)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percent >= 80 ? "bg-emerald-500" : percent >= 60 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={enterReview}
              className="flex-1 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)] transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Review Answers
            </button>
            <button
              onClick={restartExam}
              className="flex-1 py-4 rounded-xl bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

