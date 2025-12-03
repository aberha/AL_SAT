# SAT Progress Dashboard

A single-page SAT prep dashboard mockup built with Next.js, React, and TypeScript. This project demonstrates strong product thinking, clean UX hierarchy, realistic data modeling, and dynamic interactivity—all without requiring a backend.

![SAT Dashboard](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## 🎯 Product Overview

The dashboard follows Achievable's design language and adaptive learning methodology:

- **Read textbook content** → Track lesson completion
- **Take quizzes** → Assess domain mastery
- **Adaptive spaced repetition** → Memory strength tracking
- **Dashboard reflects** → Real-time learning model updates

### User Scenario

Alex (the learner) logs in midway through SAT prep and immediately understands:
1. Overall SAT readiness percentage
2. Content progress across Reading/Writing & Math
3. Memory strength from practice questions
4. Module/domain-level mastery breakdown
5. Today's study plan & upcoming tasks
6. Can practice questions and see dashboard update live

## ✨ Features

### Dashboard Components

| Component | Description |
|-----------|-------------|
| **Exam Readiness Tile** | Overall progress bar with estimated score range (e.g., 1180-1270) |
| **Content Treemap** | Visual grid showing lesson completion status (gray=unread, blue=learning, green=mastered) |
| **Memory Progress** | Spaced repetition performance with review count |
| **Domain Mastery Grid** | 8 SAT domains with clickable mastery bars |
| **Quiz Modal** | Interactive quiz with real-time answer feedback |
| **Study Plan** | Personalized daily schedule sidebar |
| **Recent Activity** | Learning journey feed with timestamps |

### Interaction Model

- **State updates live** via React hooks (no backend)
- Answer correct → mastery += 0.05
- Answer incorrect → mastery -= 0.03
- Memory strength = average(domain.mastery)
- Readiness = weighted average of all scores

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd sat-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
sat-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── layout.tsx        # Root layout with fonts
│   │   └── globals.css       # Global styles & animations
│   ├── components/
│   │   ├── Header.tsx        # App header with greeting
│   │   ├── ExamReadinessTile.tsx
│   │   ├── ContentTreemap.tsx
│   │   ├── MemoryProgress.tsx
│   │   ├── DomainCard.tsx
│   │   ├── DomainGrid.tsx
│   │   ├── QuizModal.tsx     # Interactive quiz overlay
│   │   ├── StudyPlan.tsx
│   │   └── RecentActivity.tsx
│   ├── data/
│   │   ├── questions.ts      # SAT question bank (5-10 per domain)
│   │   ├── domains.ts        # 8 SAT domains with mastery values
│   │   ├── lessons.ts        # 33 lesson nodes for treemap
│   │   ├── studyPlan.ts      # 5-day study schedule
│   │   └── activities.ts     # Recent activity items
│   ├── hooks/
│   │   └── useDashboardState.ts  # Main state management hook
│   └── types/
│       └── index.ts          # TypeScript interfaces
└── public/
```

## 🎨 Design System

Following Achievable's design language:

| Element | Value |
|---------|-------|
| Primary Blue | `#0284C7` |
| Soft Green | `#6FCF97` |
| Gray Soft | `#F3F4F6` |
| Dark Text | `#1F2937` |
| Background | Dark slate gradient |

### Design Principles
- Clean whitespace with soft pastel accents
- Thin rounded cards with minimal shadows
- Treemap visual as centerpiece
- Consistent typography weights
- Small icons with light outlines

## 🔧 Technical Notes

- **Persistence**: None required; state resets on refresh
- **No Backend**: All data stored in memory via React state
- **Responsive**: Mobile-friendly with collapsible layouts
- **TypeScript**: Full type coverage for all data structures

## 📊 Data Structure

### Lesson Node
```typescript
{
  id: string;
  section: "reading_writing" | "math";
  title: string;
  read: boolean;
  mastery: number; // 0-1
  quizCount: number;
  readingTimeMin: number;
}
```

### Domain Mastery
```typescript
{
  domainId: string;
  title: string;
  section: "reading_writing" | "math";
  mastery: number; // 0-1
  totalQuestions: number;
  correctQuestions: number;
}
```

### Question
```typescript
{
  id: string;
  domainId: string;
  stem: string;
  choices: { id: string; label: string }[];
  correctChoiceId: string;
  explanation: string;
}
```

## 🤖 How Achievable's Adaptive Learning Influenced Design

1. **Spaced Repetition**: Memory strength reflects how well concepts are retained over time
2. **Domain-Based Mastery**: SAT's 8 official domains drive the mastery breakdown
3. **Predicted Scores**: Based on weighted performance across domains
4. **Study Plans**: Personalized daily tasks based on progress gaps
5. **Visual Progress**: Treemap provides at-a-glance understanding of completion status

## 📝 License

Built as a coding assessment project. For educational and demonstration purposes.

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS
