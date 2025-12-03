"use client";

import React from "react";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: "textbook",
    label: "Textbook",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "practice",
    label: "Practice exams",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: "community",
    label: "Community",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const secondaryItems = [
  {
    id: "how-it-works",
    label: "How it works",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function Sidebar({ activeSection = "dashboard", onSectionChange }: SidebarProps) {
  return (
    <aside className="w-60 h-screen bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] flex flex-col">
      {/* Logo - h-14 to match header height */}
      <div className="h-14 px-4 border-b border-[var(--sidebar-border)] flex items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--sidebar-primary)] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-[var(--sidebar-foreground)]">Achievable</span>
          </div>
        </div>
      </div>

      {/* Exam Selector */}
      <div className="p-3">
        <button className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] transition-colors">
          <span className="font-medium">SAT</span>
          <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-[var(--radius-md)] transition-colors ${
              activeSection === item.id
                ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)] font-medium"
                : "text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)]"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="px-3">
        <div className="border-t border-[var(--sidebar-border)]" />
      </div>

      {/* Secondary Navigation */}
      <nav className="px-3 py-2 space-y-1">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange?.(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-[var(--radius-md)] text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)] transition-colors"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-[var(--sidebar-border)]">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--sidebar-accent)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-[var(--sidebar-foreground)]">Alex</div>
            <div className="text-xs text-[var(--muted-foreground)]">alex@email.com</div>
          </div>
          <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

