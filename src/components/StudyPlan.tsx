"use client";

import React from "react";
import { StudyPlanDay } from "@/types";

interface StudyPlanProps {
  studyPlan: StudyPlanDay[];
  examDate: string;
}

export default function StudyPlan({ studyPlan, examDate }: StudyPlanProps) {
  return (
    <div className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
      <div className="p-4 border-b border-[var(--border)]">
        <h3 className="text-sm font-medium text-[var(--foreground)]">Study Plan</h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          Exam on {examDate}
        </p>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {studyPlan.map((day) => (
          <div key={day.date} className="p-4 border-b border-[var(--border)] last:border-b-0">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{day.label}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{day.totalMinutes}m</span>
            </div>
            <div className="space-y-1">
              {day.tasks.map((task, idx) => (
                <div key={idx} className="flex justify-between text-sm text-[var(--muted-foreground)]">
                  <span>{task.title}</span>
                  <span>{task.minutes}m</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

