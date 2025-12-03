"use client";

import React from "react";

interface MemoryProgressProps {
  memoryStrength: number;
  reviewCount: number;
  onReviewClick?: () => void;
}

export default function MemoryProgress({
  memoryStrength,
  reviewCount,
  onReviewClick,
}: MemoryProgressProps) {
  const strengthPercent = Math.round(memoryStrength * 100);

  // Dynamic color based on retention
  const getColor = (p: number) => {
    if (p >= 80) return { text: "text-emerald-600", bar: "bg-emerald-500" };
    if (p >= 60) return { text: "text-blue-600", bar: "bg-blue-500" };
    if (p >= 40) return { text: "text-amber-600", bar: "bg-amber-500" };
    return { text: "text-rose-600", bar: "bg-rose-500" };
  };

  const colors = getColor(strengthPercent);

  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
      {/* Header with icon and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-violet-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Memory progress</h3>
            <p className="text-xs text-[var(--muted-foreground)]">Spaced repetition strength</p>
          </div>
        </div>
      </div>

      {/* Main content - percentage and progress bar */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1 mb-2">
          <span className={`text-4xl font-bold ${colors.text}`}>{strengthPercent}</span>
          <span className="text-xl font-semibold text-[var(--muted-foreground)]">%</span>
          <span className="text-sm text-[var(--muted-foreground)] ml-1">retention</span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
            style={{ width: `${strengthPercent}%` }}
          />
        </div>
      </div>

      {/* Review button */}
      <button
        onClick={onReviewClick}
        className="w-full px-4 py-2.5 text-sm font-medium border border-[var(--border)] rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Review ({reviewCount} ready)
      </button>
    </div>
  );
}
