"use client";

import React from "react";

interface ExamReadinessTileProps {
  readinessPercent: number;
  predictedScoreLow: number;
  predictedScoreHigh: number;
}

export default function ExamReadinessTile({
  readinessPercent,
  predictedScoreLow,
  predictedScoreHigh,
}: ExamReadinessTileProps) {
  const percent = Math.round(readinessPercent);

  // Dynamic color based on progress - for text and progress bar only
  const getProgressColor = (p: number) => {
    if (p >= 90) return { text: "text-emerald-600", bar: "bg-emerald-600" };
    if (p >= 75) return { text: "text-emerald-500", bar: "bg-emerald-500" };
    if (p >= 60) return { text: "text-blue-500", bar: "bg-blue-500" };
    if (p >= 40) return { text: "text-amber-500", bar: "bg-amber-500" };
    return { text: "text-rose-500", bar: "bg-rose-500" };
  };

  const getStatusLabel = (p: number) => {
    if (p >= 90) return "Excellent!";
    if (p >= 75) return "Great progress";
    if (p >= 60) return "On track";
    if (p >= 40) return "Keep going";
    return "Time to study!";
  };

  const colors = getProgressColor(percent);

  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icon is always blue/primary - NOT orange */}
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--primary)] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Exam readiness</h3>
            <p className="text-xs text-[var(--muted-foreground)]">{getStatusLabel(percent)}</p>
          </div>
        </div>
      </div>

      {/* Big percentage and score range */}
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-bold ${colors.text}`}>{percent}</span>
          <span className="text-2xl font-semibold text-[var(--muted-foreground)]">%</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Est. score range</p>
          <p className={`text-2xl font-bold ${colors.text}`}>{predictedScoreLow} – {predictedScoreHigh}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="h-3 bg-[var(--secondary)] rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1 text-xs text-[var(--muted-foreground)]">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
