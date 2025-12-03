"use client";

import { useState, useCallback, useMemo } from "react";
import { DashboardState, AnswerRecord, DomainMastery, ActivityItem } from "@/types";
import { initialDomains } from "@/data/domains";
import { initialLessons } from "@/data/lessons";
import { initialStudyPlan } from "@/data/studyPlan";
import { initialActivities } from "@/data/activities";

// Evaluation rules (as per PRD)
const CORRECT_MASTERY_INCREASE = 0.05;
const INCORRECT_MASTERY_DECREASE = 0.03;

export function useDashboardState() {
  const [domains, setDomains] = useState<DomainMastery[]>(initialDomains);
  const [lessons] = useState(initialLessons);
  const [studyPlan] = useState(initialStudyPlan);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [quizSession, setQuizSession] = useState<AnswerRecord[]>([]);

  // Calculate memory strength (average of all domain mastery)
  const memoryStrength = useMemo(() => {
    const totalMastery = domains.reduce((sum, d) => sum + d.mastery, 0);
    return totalMastery / domains.length;
  }, [domains]);

  // Calculate review count based on lessons that need review
  const reviewCount = useMemo(() => {
    return lessons.filter((l) => l.read && l.mastery < 0.8).length;
  }, [lessons]);

  // Calculate readiness (weighted average of all mastery scores)
  const readinessPercent = useMemo(() => {
    const domainWeight = 0.7;
    const lessonWeight = 0.3;

    const domainMasteryAvg =
      domains.reduce((sum, d) => sum + d.mastery, 0) / domains.length;
    const lessonMasteryAvg =
      lessons.reduce((sum, l) => sum + l.mastery, 0) / lessons.length;

    return (domainMasteryAvg * domainWeight + lessonMasteryAvg * lessonWeight) * 100;
  }, [domains, lessons]);

  // Calculate predicted score range
  const predictedScores = useMemo(() => {
    const baseScore = 400; // Minimum SAT score per section
    const maxBonus = 400; // Maximum bonus per section (400-800 range per section)
    
    // Calculate per-section scores
    const rwDomains = domains.filter((d) => d.section === "reading_writing");
    const mathDomains = domains.filter((d) => d.section === "math");
    
    const rwMastery = rwDomains.reduce((sum, d) => sum + d.mastery, 0) / rwDomains.length;
    const mathMastery = mathDomains.reduce((sum, d) => sum + d.mastery, 0) / mathDomains.length;
    
    const rwScore = baseScore + rwMastery * maxBonus;
    const mathScore = baseScore + mathMastery * maxBonus;
    
    const totalScore = rwScore + mathScore;
    
    // Add variance for score range
    const variance = 90;
    
    return {
      low: Math.round(totalScore - variance),
      high: Math.round(totalScore + variance),
    };
  }, [domains]);

  // Handle quiz answer submission
  const handleAnswerSubmit = useCallback((record: AnswerRecord) => {
    setQuizSession((prev) => [...prev, record]);

    // Update domain mastery
    setDomains((prevDomains) =>
      prevDomains.map((domain) => {
        if (domain.domainId !== record.domainId) return domain;

        const masteryChange = record.correct
          ? CORRECT_MASTERY_INCREASE
          : -INCORRECT_MASTERY_DECREASE;

        const newMastery = Math.max(0, Math.min(1, domain.mastery + masteryChange));
        
        return {
          ...domain,
          mastery: newMastery,
          correctQuestions: record.correct
            ? domain.correctQuestions + 1
            : domain.correctQuestions,
          totalQuestions: domain.totalQuestions + 1,
        };
      })
    );

    // Add to activity feed
    const domainTitle = domains.find((d) => d.domainId === record.domainId)?.title || "Unknown";
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: record.correct ? "answer_correct" : "practice_test",
      description: record.correct
        ? `Answered correctly in ${domainTitle}`
        : `Practiced ${domainTitle}`,
      timestamp: "Just now",
    };

    setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
  }, [domains]);

  const state: DashboardState = {
    lessons,
    memory: {
      strength: memoryStrength,
      reviewCount,
    },
    domains,
    quizSession,
    studyPlan,
    activities,
    readinessPercent,
    predictedScoreLow: predictedScores.low,
    predictedScoreHigh: predictedScores.high,
  };

  return {
    state,
    handleAnswerSubmit,
  };
}

