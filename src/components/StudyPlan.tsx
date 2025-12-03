"use client";

import React from "react";
import { StudyPlanDay } from "@/types";

interface StudyPlanProps {
  studyPlan: StudyPlanDay[];
  examDate: string;
}

export default function StudyPlan({ studyPlan, examDate }: StudyPlanProps) {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[#0B5FB3] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[var(--foreground)]">Study plan</h3>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">
            For exam on <span className="font-medium text-[var(--foreground)]">{examDate}</span>
          </span>
          <button className="text-xs text-[var(--primary)] hover:underline">
            Change exam date
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="max-h-[350px] overflow-y-auto">
        {studyPlan.map((day, dayIndex) => (
          <div
            key={day.date}
            className={`p-4 border-b border-[var(--border)] last:border-b-0 ${
              dayIndex === 0 ? "bg-[var(--accent)]" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {dayIndex === 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                )}
                <span className={`text-sm font-medium ${
                  dayIndex === 0 ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                }`}>
                  {day.label}
                </span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {day.totalMinutes}m
              </span>
            </div>

            <div className="space-y-1.5 pl-3">
              {day.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-[var(--border)] flex items-center justify-center">
                      {dayIndex === 0 && taskIndex === 0 && (
                        <div className="w-2 h-2 rounded-sm bg-[var(--primary)]" />
                      )}
                    </div>
                    <span className="text-sm text-[var(--muted-foreground)]">{task.title}</span>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] tabular-nums">
                    {task.minutes}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View Full Schedule Button */}
      <div className="p-3 border-t border-[var(--border)]">
        <button className="w-full text-center text-sm font-medium text-[#1F78D1] hover:text-[#4CA6FF] transition-colors flex items-center justify-center gap-1">
          View full schedule
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
