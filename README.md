# SAT Learner Dashboard

A comprehensive SAT prep dashboard built with Next.js, React, and TypeScript. This project demonstrates product thinking, UX design, and technical execution for an adaptive learning platform.

**[Live Demo](https://al-sat.vercel.app)** · **[Source Code](https://github.com/aberha/AL_SAT)**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

---

## Product Design Decisions

### The Core Question
*"What does a learner need to see when they log in halfway through SAT prep?"*

I identified **three key user needs**:

1. **"Am I ready?"** → Exam Readiness with predicted score range
2. **"What should I do today?"** → Personalized study plan
3. **"Can I practice right now?"** → Full practice exam with real SAT questions

### Design Philosophy

| Decision | Rationale |
|----------|-----------|
| **Hierarchical treemap** over simple progress bars | Mirrors Achievable's actual UI; shows content structure at a glance |
| **Predicted score range** (1189-1369) | Motivates learners by connecting effort to outcomes |
| **Domain mastery breakdown** | SAT has 8 official domains—surfacing per-domain progress enables targeted practice |
| **Integrated practice exam** | Rather than just showing data, let users *do something* immediately |
| **Real questions via OpenSAT API** | 2,474 actual SAT questions > fake placeholder content |

### Key Product Choices

**Why a full practice exam?**  
A dashboard that only *displays* progress is passive. By integrating a complete practice exam (configurable by section, time limit, question count), learners can take action directly from the dashboard. This reflects how modern learning apps blend assessment with progress tracking.

**Why real API integration?**  
I integrated the [OpenSAT question bank](https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5) to demonstrate that even a "facade" can work with real content. The 2,474 questions are organized by domain, with explanations—making the practice exam genuinely useful.

**Why these metrics?**
- **Exam readiness %** = Weighted average of domain mastery (simple, motivating)
- **Memory strength** = Spaced repetition indicator (Achievable's core methodology)
- **Score range** = Bounded prediction that feels achievable, not anxiety-inducing

---

## Features

### Dashboard (Main View)
- **Exam Readiness Tile**: Overall progress + predicted SAT score range
- **Memory Progress**: Spaced repetition strength with review count
- **Content Treemap**: Hierarchical view of Math (348m) + Reading & Writing (303m) content
- **Domain Mastery**: 8 SAT domains with clickable practice buttons
- **Study Plan**: Daily schedule with time estimates
- **Recent Activity**: Learning journey feed

### Practice Exam (Full Feature)
- **2,474 real SAT questions** from OpenSAT API
- Section selection: Full Test, Math Only, or Reading & Writing
- Configurable: 5-50 questions, timed or untimed
- Question navigator with flagging
- Results breakdown by domain
- Review mode with explanations

### Interactions
- Click any domain → Start focused quiz
- Answer questions → Mastery updates live
- Timer countdown → Auto-submit when time expires
- Flag questions → Return to them before submitting

---

## Technical Implementation

### Architecture
```
src/
├── app/                    # Next.js app router
├── components/             # 11 React components
│   ├── PracticeExam.tsx   # 790 lines - full exam feature
│   ├── ContentTreemap.tsx # Hierarchical SVG visualization
│   └── ...
├── data/                   # Mock data & structure
├── hooks/                  # useDashboardState (state management)
├── services/               # OpenSAT API integration
└── types/                  # TypeScript interfaces
```

### Key Technical Decisions
- **No backend required**: All state in React hooks; resets on refresh
- **API caching**: Questions fetched once, cached for session
- **Squarified treemap**: Custom algorithm for optimal rectangle layout
- **CSS variables**: Design tokens for consistent theming

### Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Data**: OpenSAT API (public JSON endpoint)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What I'd Build Next

With more time, I would add:
1. **Persistent progress** via localStorage or backend
2. **Score trend chart** showing improvement over time
3. **Adaptive question selection** based on weak domains
4. **Mobile-optimized exam experience**
5. **Textbook page** with lesson content

---

## Time Spent

Approximately 4 hours on:
- Dashboard layout and components (~1.5h)
- Practice exam feature (~1.5h)
- OpenSAT API integration (~30m)
- Styling and polish (~30m)

---

Built as a coding assessment demonstrating product thinking and technical execution.
