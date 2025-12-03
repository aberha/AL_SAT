"use client";

import React from "react";
import { DomainMastery } from "@/types";
import DomainCard from "./DomainCard";

interface DomainGridProps {
  domains: DomainMastery[];
  onDomainClick: (domain: DomainMastery) => void;
}

export default function DomainGrid({ domains, onDomainClick }: DomainGridProps) {
  const rwDomains = domains.filter((d) => d.section === "reading_writing");
  const mathDomains = domains.filter((d) => d.section === "math");

  const calculateAverage = (sectionDomains: DomainMastery[]) => {
    if (sectionDomains.length === 0) return 0;
    return Math.round(
      (sectionDomains.reduce((sum, d) => sum + d.mastery, 0) / sectionDomains.length) * 100
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Reading & Writing */}
      <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--foreground)]">Reading & Writing</h3>
          <span className="text-xs text-[var(--muted-foreground)]">
            Avg: <span className="font-medium text-[var(--foreground)]">{calculateAverage(rwDomains)}%</span>
          </span>
        </div>
        <div className="space-y-2">
          {rwDomains.map((domain) => (
            <DomainCard
              key={domain.domainId}
              domain={domain}
              onClick={() => onDomainClick(domain)}
            />
          ))}
        </div>
      </div>

      {/* Math */}
      <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--foreground)]">Math</h3>
          <span className="text-xs text-[var(--muted-foreground)]">
            Avg: <span className="font-medium text-[var(--foreground)]">{calculateAverage(mathDomains)}%</span>
          </span>
        </div>
        <div className="space-y-2">
          {mathDomains.map((domain) => (
            <DomainCard
              key={domain.domainId}
              domain={domain}
              onClick={() => onDomainClick(domain)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
