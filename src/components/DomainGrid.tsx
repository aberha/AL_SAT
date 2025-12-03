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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Reading & Writing */}
      <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-5">
        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
          Reading & Writing
        </h3>
        <div className="space-y-3">
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
      <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-5">
        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
          Math
        </h3>
        <div className="space-y-3">
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

