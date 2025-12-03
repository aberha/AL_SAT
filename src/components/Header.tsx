"use client";

import React from "react";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--card)] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-[var(--foreground)]">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Dark mode toggle placeholder */}
        <button className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors">
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        
        {/* Notifications */}
        <button className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors relative">
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--primary)] rounded-full" />
        </button>

        {/* Full screen toggle */}
        <button className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors">
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
