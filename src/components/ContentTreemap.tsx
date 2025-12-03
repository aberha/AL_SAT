"use client";

import React from "react";
import { LessonNode } from "@/types";

interface ContentTreemapProps {
  lessons: LessonNode[];
}

// Treemap visualization component - displays lesson progress as a hierarchical chart
export default function ContentTreemap({ lessons }: ContentTreemapProps) {
  const readCount = lessons.filter((l) => l.read).length;
  const totalCount = lessons.length;

  return (
    <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">Study Progress</h3>
        <span className="text-sm text-[var(--muted-foreground)]">
          {readCount} / {totalCount} lessons completed
        </span>
      </div>
      
      <div className="h-64 bg-[var(--secondary)] rounded flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Treemap visualization coming soon</p>
      </div>
    </div>
  );
}

