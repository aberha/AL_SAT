# AL_SAT - SAT Learning Dashboard

A modern, interactive dashboard for SAT exam preparation built with Next.js, React, and TypeScript.

## Overview

This project creates a comprehensive learning dashboard that helps students track their SAT preparation progress, practice questions, and manage their study plan.

## Features

- **Exam Readiness Tracking**: Visual progress indicators showing overall readiness percentage and estimated score range
- **Memory Progress**: Spaced repetition system tracking with retention metrics
- **Domain Mastery**: Track performance across all SAT domains (Math & Reading/Writing)
- **Interactive Quizzes**: Practice questions powered by the OpenSAT API
- **Study Planning**: Personalized study schedule management

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Data Source**: OpenSAT API (2,400+ practice questions)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ExamReadinessTile.tsx
│   ├── Header.tsx
│   ├── MemoryProgress.tsx
│   ├── QuizModal.tsx
│   └── Sidebar.tsx
├── hooks/            # Custom React hooks
├── services/         # API services
│   └── opensat-api.ts
└── types/            # TypeScript type definitions
```

## SAT Domains Covered

### Math
- Algebra
- Advanced Math
- Problem Solving & Data Analysis
- Geometry & Trigonometry

### Reading & Writing
- Information & Ideas
- Craft & Structure
- Expression of Ideas
- Standard English Conventions

## API Integration

Questions are fetched from the [OpenSAT API](https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5), providing access to thousands of real SAT practice questions.

## Development Status

🚧 In active development - Dashboard layout and quiz functionality operational

## License

MIT

