"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ExamReadinessTile from "@/components/ExamReadinessTile";
import ContentTreemap from "@/components/ContentTreemap";
import MemoryProgress from "@/components/MemoryProgress";
import DomainGrid from "@/components/DomainGrid";
import QuizModal from "@/components/QuizModal";
import StudyPlan from "@/components/StudyPlan";
import RecentActivity from "@/components/RecentActivity";
import { useDashboardState } from "@/hooks/useDashboardState";
import { DomainMastery } from "@/types";
import { getQuestionsByDomain, initializeQuestions } from "@/data/questions";
import { examDate } from "@/data/studyPlan";

// Placeholder component for non-implemented pages
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--secondary)] flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">{title}</h2>
        <p className="text-[var(--muted-foreground)]">This feature is coming soon!</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state, handleAnswerSubmit } = useDashboardState();
  const [selectedDomain, setSelectedDomain] = useState<DomainMastery | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Initialize questions from OpenSAT API on mount
  useEffect(() => {
    initializeQuestions().catch((error) => {
      console.error("Failed to initialize questions:", error);
    });
  }, []);

  const handleDomainClick = (domain: DomainMastery) => {
    setSelectedDomain(domain);
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
    setSelectedDomain(null);
  };

  const handleReviewClick = () => {
    // Open quiz for the domain with lowest mastery
    const lowestMasteryDomain = state.domains.reduce((prev, curr) =>
      prev.mastery < curr.mastery ? prev : curr
    );
    setSelectedDomain(lowestMasteryDomain);
    setIsQuizOpen(true);
  };

  const quizQuestions = selectedDomain
    ? getQuestionsByDomain(selectedDomain.domainId)
    : [];

  // Get page title based on active section
  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Dashboard";
      case "textbook": return "Textbook";
      case "practice": return "Practice Exams";
      case "feedback": return "Feedback";
      case "community": return "Community";
      case "how-it-works": return "How it works";
      case "resources": return "Resources";
      default: return "Dashboard";
    }
  };

  // Render content based on active section
  const renderContent = () => {
    if (activeSection !== "dashboard") {
      return <ComingSoon title={getPageTitle()} />;
    }

    return (
      <div className="p-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Main Content (2 cols) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ExamReadinessTile
                readinessPercent={state.readinessPercent}
                predictedScoreLow={state.predictedScoreLow}
                predictedScoreHigh={state.predictedScoreHigh}
              />
              <MemoryProgress
                memoryStrength={state.memory.strength}
                reviewCount={state.memory.reviewCount}
                onReviewClick={handleReviewClick}
              />
            </div>

            {/* Study Progress Treemap - Hover for stats only */}
            <ContentTreemap lessons={state.lessons} />

            {/* Domain Mastery */}
            <DomainGrid
              domains={state.domains}
              onDomainClick={handleDomainClick}
            />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-6">
            <StudyPlan studyPlan={state.studyPlan} examDate={examDate} />
            <RecentActivity activities={state.activities} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />

        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Quiz Modal */}
      {selectedDomain && quizQuestions.length > 0 && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={handleQuizClose}
          domain={selectedDomain}
          questions={quizQuestions}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
}
