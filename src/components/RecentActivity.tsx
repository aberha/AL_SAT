"use client";

import React from "react";
import { ActivityItem } from "@/types";

interface RecentActivityProps {
  activities: ActivityItem[];
}

// Get icon and colors based on activity type - matching dark mode screenshot
const getActivityStyle = (type: string) => {
  switch (type) {
    case "quiz_passed":
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: "bg-emerald-500",
      };
    case "lesson_completed":
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
        bgColor: "bg-[#1F78D1]",
      };
    case "review":
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
        bgColor: "bg-violet-500",
      };
    case "answer_correct":
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        bgColor: "bg-[#4CA6FF]",
      };
    case "practice_test":
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ),
        bgColor: "bg-amber-500",
      };
    default:
      return {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        bgColor: "bg-[#0B5FB3]",
      };
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[#1F78D1] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Activity</h3>
          <p className="text-xs text-[var(--muted-foreground)]">Your learning journey</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-[var(--border)]">
        {activities.slice(0, 5).map((activity, index) => {
          const style = getActivityStyle(activity.type);
          const isRecent = index === 0;
          
          return (
            <div 
              key={activity.id} 
              className="p-3 flex items-center gap-3 hover:bg-[var(--accent)] transition-colors"
            >
              <div className={`w-8 h-8 rounded-full ${style.bgColor} flex items-center justify-center flex-shrink-0 text-white`}>
                {style.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--foreground)] truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {activity.timestamp}
                </p>
              </div>
              {isRecent && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#4CA6FF] text-white rounded-full">
                  New
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* View All */}
      <div className="p-3 border-t border-[var(--border)]">
        <button className="w-full text-center text-sm font-medium text-[#1F78D1] hover:text-[#4CA6FF] transition-colors flex items-center justify-center gap-1">
          View all activity
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
