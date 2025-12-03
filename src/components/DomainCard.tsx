"use client";

import React from "react";
import { DomainMastery } from "@/types";

interface DomainCardProps {
  domain: DomainMastery;
  onClick: () => void;
}

export default function DomainCard({ domain, onClick }: DomainCardProps) {
  const masteryPercent = Math.round(domain.mastery * 100);

  const getMasteryColor = (percent: number) => {
    if (percent >= 70) return "bg-emerald-500";
    if (percent >= 50) return "bg-[var(--primary)]";
    if (percent >= 30) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-[var(--radius-md)] border border-[var(--border)] hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)]">
          {domain.title}
        </span>
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {masteryPercent}%
        </span>
      </div>
      
      <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
        <div
          className={`h-full ${getMasteryColor(masteryPercent)} rounded-full transition-all duration-300`}
          style={{ width: `${masteryPercent}%` }}
        />
      </div>
      
      {/* Clear call-to-action with icon */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-[var(--muted-foreground)]">
          {domain.correctQuestions}/{domain.totalQuestions} correct
        </p>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Practice</span>
        </div>
      </div>
    </button>
  );
}
