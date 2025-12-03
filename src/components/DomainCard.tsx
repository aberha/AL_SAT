"use client";

import React from "react";
import { DomainMastery } from "@/types";

interface DomainCardProps {
  domain: DomainMastery;
  onClick: () => void;
}

export default function DomainCard({ domain, onClick }: DomainCardProps) {
  const masteryPercent = Math.round(domain.mastery * 100);

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[var(--foreground)]">
          {domain.title}
        </span>
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {masteryPercent}%
        </span>
      </div>
      
      <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all"
          style={{ width: `${masteryPercent}%` }}
        />
      </div>
      
      <p className="text-xs text-[var(--muted-foreground)] mt-2">
        {domain.correctQuestions}/{domain.totalQuestions} correct
      </p>
    </button>
  );
}

