"use client";

import React, { useState, useEffect } from "react";
import { Question, DomainMastery, AnswerRecord } from "@/types";

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

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: DomainMastery;
  questions: Question[];
  onAnswerSubmit: (record: AnswerRecord) => void;
}

export default function QuizModal({
  isOpen,
  onClose,
  domain,
  questions,
  onAnswerSubmit,
}: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<AnswerRecord[]>([]);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctChoiceId;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setSessionAnswers([]);
    }
  }, [isOpen]);

  if (!isOpen || !currentQuestion) return null;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      domainId: domain.domainId,
      correct: selectedAnswer === currentQuestion.correctChoiceId,
    };

    setSessionAnswers([...sessionAnswers, record]);
    onAnswerSubmit(record);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onClose();
    }
  };

  const correctCount = sessionAnswers.filter((a) => a.correct).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div>
            <h3 className="text-base font-medium text-[var(--foreground)]">
              {domain.title}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Question {currentIndex + 1} of {questions.length} • Score: {correctCount}/{sessionAnswers.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-[var(--secondary)]">
          <div
            className="h-full bg-[var(--primary)] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="p-6">
          <p className="text-[var(--foreground)] mb-6 leading-relaxed">
            {cleanLatex(currentQuestion.stem)}
          </p>

          {/* Choices */}
          <div className="space-y-2">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.id;
              const isCorrectChoice = choice.id === currentQuestion.correctChoiceId;

              let choiceStyle = "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--accent)]";
              
              if (showResult) {
                if (isCorrectChoice) {
                  choiceStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
                } else if (isSelected && !isCorrectChoice) {
                  choiceStyle = "border-rose-500 bg-rose-50 dark:bg-rose-500/10";
                }
              } else if (isSelected) {
                choiceStyle = "border-[var(--primary)] bg-[var(--primary)]/5";
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => !showResult && setSelectedAnswer(choice.id)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-[var(--radius-md)] border transition-all ${choiceStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border ${
                      showResult && isCorrectChoice
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : showResult && isSelected && !isCorrectChoice
                        ? "bg-rose-500 border-rose-500 text-white"
                        : isSelected
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : "border-[var(--border)] text-[var(--muted-foreground)]"
                    }`}>
                      {choice.id.toUpperCase()}
                    </span>
                    <span className="text-[var(--foreground)]">{cleanLatex(choice.label)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`mt-4 p-4 rounded-[var(--radius-md)] ${
              isCorrect 
                ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30" 
                : "bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30"
            }`}>
              <div className="flex items-start gap-2">
                <span className={`text-sm font-medium ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                {cleanLatex(currentQuestion.explanation)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[var(--border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Exit Quiz
          </button>

          {!showResult ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
                selectedAnswer
                  ? "bg-[var(--primary)] text-white hover:opacity-90"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] cursor-not-allowed"
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
            >
              {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
