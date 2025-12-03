"use client";

import React, { useState, useMemo } from "react";
import { LessonNode } from "@/types";

// Treemap blue palette – fixed
const TREEMAP_BLUE_PALETTE = [
  "#031B4F", // very dark navy
  "#063C8A", // dark blue
  "#0B5FB3", // medium blue
  "#1F78D1", // light blue
  "#4CA6FF"  // lighter blue
];

interface ContentTreemapProps {
  lessons: LessonNode[];
}

interface TreemapCell {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHeader?: boolean;
  mastery?: number;
  lesson?: LessonNode;
}

// Group lessons by section
function groupLessonsBySection(lessons: LessonNode[]) {
  const mathLessons = lessons.filter(l => l.section === "math");
  const rwLessons = lessons.filter(l => l.section === "reading_writing");
  
  return [
    { 
      id: "math", 
      title: "Math", 
      lessons: mathLessons,
      totalValue: mathLessons.reduce((sum, l) => sum + l.readingTimeMin, 0)
    },
    { 
      id: "reading_writing", 
      title: "Reading & Writing", 
      lessons: rwLessons,
      totalValue: rwLessons.reduce((sum, l) => sum + l.readingTimeMin, 0)
    }
  ];
}

// Layout algorithm for hierarchical treemap
function layoutHierarchicalTreemap(
  lessons: LessonNode[],
  containerWidth: number,
  containerHeight: number
): TreemapCell[] {
  const cells: TreemapCell[] = [];
  const groups = groupLessonsBySection(lessons);
  const totalValue = groups.reduce((sum, g) => sum + g.totalValue, 0);
  
  let currentX = 0;
  
  groups.forEach((group) => {
    const groupWidth = (group.totalValue / totalValue) * containerWidth;
    const headerHeight = 28;
    
    // Add group header
    cells.push({
      id: `header-${group.id}`,
      title: `${group.title}: ${group.totalValue}m`,
      x: currentX,
      y: 0,
      width: groupWidth,
      height: headerHeight,
      isHeader: true,
    });
    
    // Layout lessons within group
    const lessonArea = {
      x: currentX,
      y: headerHeight,
      width: groupWidth,
      height: containerHeight - headerHeight,
    };
    
    const sortedLessons = [...group.lessons].sort((a, b) => b.readingTimeMin - a.readingTimeMin);
    const groupTotal = group.totalValue;
    
    layoutLessonsInArea(sortedLessons, lessonArea, groupTotal, cells);
    
    currentX += groupWidth;
  });
  
  return cells;
}

// Recursive layout for lessons within an area
function layoutLessonsInArea(
  lessons: { readingTimeMin: number; mastery: number; title: string; id: string; quizCount: number; read: boolean; section: string }[],
  area: { x: number; y: number; width: number; height: number },
  totalValue: number,
  cells: TreemapCell[]
) {
  if (lessons.length === 0) return;
  
  if (lessons.length === 1) {
    cells.push({
      id: lessons[0].id,
      title: lessons[0].title,
      x: area.x,
      y: area.y,
      width: area.width,
      height: area.height,
      mastery: lessons[0].mastery,
      lesson: lessons[0] as LessonNode,
    });
    return;
  }
  
  const isHorizontal = area.width >= area.height;
  
  // Find split point
  let accumulated = 0;
  let splitIndex = 0;
  const targetHalf = totalValue / 2;
  
  for (let i = 0; i < lessons.length; i++) {
    accumulated += lessons[i].readingTimeMin;
    if (accumulated >= targetHalf) {
      splitIndex = i + 1;
      break;
    }
  }
  
  if (splitIndex === 0) splitIndex = 1;
  if (splitIndex >= lessons.length) splitIndex = lessons.length - 1;
  
  const firstHalf = lessons.slice(0, splitIndex);
  const secondHalf = lessons.slice(splitIndex);
  
  const firstTotal = firstHalf.reduce((sum, l) => sum + l.readingTimeMin, 0);
  const secondTotal = secondHalf.reduce((sum, l) => sum + l.readingTimeMin, 0);
  const ratio = firstTotal / totalValue;
  
  if (isHorizontal) {
    const splitWidth = area.width * ratio;
    layoutLessonsInArea(firstHalf, { x: area.x, y: area.y, width: splitWidth, height: area.height }, firstTotal, cells);
    layoutLessonsInArea(secondHalf, { x: area.x + splitWidth, y: area.y, width: area.width - splitWidth, height: area.height }, secondTotal, cells);
  } else {
    const splitHeight = area.height * ratio;
    layoutLessonsInArea(firstHalf, { x: area.x, y: area.y, width: area.width, height: splitHeight }, firstTotal, cells);
    layoutLessonsInArea(secondHalf, { x: area.x, y: area.y + splitHeight, width: area.width, height: area.height - splitHeight }, secondTotal, cells);
  }
}

export default function ContentTreemap({ lessons }: ContentTreemapProps) {
  const [hoveredLesson, setHoveredLesson] = useState<LessonNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const cells = useMemo(() => {
    const containerWidth = 780;
    const containerHeight = 260;
    return layoutHierarchicalTreemap(lessons, containerWidth, containerHeight);
  }, [lessons]);

  // Map mastery into 5 discrete blue shades
  const getNodeColor = (mastery: number = 0): { bg: string; text: string } => {
    let idx = 0;
    if (mastery >= 0.2 && mastery < 0.4) idx = 1;
    else if (mastery >= 0.4 && mastery < 0.6) idx = 2;
    else if (mastery >= 0.6 && mastery < 0.8) idx = 3;
    else if (mastery >= 0.8) idx = 4;

    return {
      bg: TREEMAP_BLUE_PALETTE[idx],
      text: "#FFFFFF"
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX + 12, y: e.clientY + 12 });
  };

  const readCount = lessons.filter((l) => l.read).length;
  const totalCount = lessons.length;
  const studyTimeMin = lessons.reduce((sum, l) => sum + (l.read ? l.readingTimeMin : 0), 0);
  const hours = Math.floor(studyTimeMin / 60);
  const mins = studyTimeMin % 60;

  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[#0B5FB3] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">Study progress</h3>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Pages Read</span>
            <span className="text-sm font-semibold text-[var(--foreground)]">{readCount} / {totalCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Study Time</span>
            <span className="text-sm font-semibold text-[var(--foreground)]">{hours}h {mins}m</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className="px-5 py-3 text-sm font-medium bg-[#0B5FB3] text-white rounded-[var(--radius-md)] hover:bg-[#1F78D1] transition-colors text-center">
          Next → Read 1.2.3 Inspection
        </button>
        <button className="px-5 py-3 text-sm font-medium border border-[var(--border)] bg-[var(--card)] rounded-[var(--radius-md)] hover:bg-[var(--accent)] transition-colors text-center">
          Review ({lessons.filter(l => l.read && l.mastery < 0.7).length} ready)
        </button>
      </div>

      {/* Treemap with hierarchical headers */}
      <div className="relative mb-4">
        <p className="text-xs text-[var(--muted-foreground)] mb-2 italic">hover over chart to see details</p>
        
        <svg 
          viewBox="0 0 780 260" 
          className="w-full h-auto overflow-hidden border border-[var(--border)]"
          style={{ aspectRatio: "780/260" }}
          preserveAspectRatio="none"
        >
          {cells.map((cell) => {
            if (cell.isHeader) {
              // Header row for section
              return (
                <g key={cell.id}>
                  <rect
                    x={cell.x}
                    y={cell.y}
                    width={cell.width}
                    height={cell.height}
                    rx={0}
                    ry={0}
                    fill="#021837"
                    stroke="white"
                    strokeWidth={1}
                  />
                  <text
                    x={cell.x + 8}
                    y={cell.y + cell.height / 2}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="600"
                    className="pointer-events-none select-none"
                  >
                    {cell.title}
                  </text>
                </g>
              );
            }
            
            const colors = getNodeColor(cell.mastery);
            return (
              <g key={cell.id}>
                <rect
                  x={cell.x}
                  y={cell.y}
                  width={cell.width}
                  height={cell.height}
                  rx={0}
                  ry={0}
                  fill={colors.bg}
                  stroke="white"
                  strokeWidth={1}
                  className="transition-opacity hover:opacity-80"
                  onMouseEnter={() => cell.lesson && setHoveredLesson(cell.lesson)}
                  onMouseLeave={() => setHoveredLesson(null)}
                  onMouseMove={handleMouseMove}
                />
                {cell.width > 60 && cell.height > 22 && (
                  <text
                    x={cell.x + 6}
                    y={cell.y + 14}
                    textAnchor="start"
                    dominantBaseline="hanging"
                    fill={colors.text}
                    fontSize="11"
                    fontWeight="500"
                    className="pointer-events-none select-none"
                  >
                    {cell.title.length > Math.floor((cell.width - 12) / 7)
                      ? cell.title.slice(0, Math.floor((cell.width - 12) / 7)) + "..."
                      : cell.title}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-4 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3" style={{ backgroundColor: "#031B4F" }} />
          <span>Lower mastery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3" style={{ backgroundColor: "#0B5FB3" }} />
          <span>Mid mastery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3" style={{ backgroundColor: "#4CA6FF" }} />
          <span>Higher mastery</span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredLesson && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="bg-[#031B4F] border border-[#0B5FB3] rounded-lg p-3 shadow-xl min-w-[220px]">
            <h4 className="text-sm font-semibold text-white mb-2">
              {hoveredLesson.title}
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-300">Reading time:</span>
                <span className="text-white font-medium">{hoveredLesson.readingTimeMin} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Quiz questions:</span>
                <span className="text-white font-medium">{hoveredLesson.quizCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Mastery:</span>
                <span className="text-[#4CA6FF] font-medium">{Math.round(hoveredLesson.mastery * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Status:</span>
                <span className="font-medium text-blue-200">
                  {hoveredLesson.mastery >= 0.8
                    ? "Higher mastery"
                    : hoveredLesson.mastery >= 0.4
                    ? "Medium mastery"
                    : "Lower mastery"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
