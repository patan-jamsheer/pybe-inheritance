# pyBe — Inheritance Feature: "The Bird Family"
A MERN-stack lesson feature for pyBe teaching OOP **inheritance** through a story: a Bird
parent and four children — Eagle (basic), Sparrow (extend), Penguin (override), and Owl
(override + `super()`) — each demonstrating one distinct inheritance concept.

Flow (mirrors the app's existing "Thirsty Crow" lesson):
story → reflect → think it through (MCQs) → concept explained (+ diagram) → map story to code
(MCQs) → 8-step from-scratch code build-up (each piece tied to a story line) → four interactive
levels (Eagle → Sparrow → Penguin → Owl) → recap.

## Structure

```
pybe-inheritance/
├── backend/     Express + MongoDB (Mongoose) — tracks a learner's progress through the lesson
└── frontend/    React + Vite — the lesson UI
```

## Run it

**Backend**
```
cd backend
cp .env.example .env      # point MONGO_URI at your Mongo instance
npm install
npm run dev                # http://localhost:5000
```

**Frontend**
```
cd frontend
npm install
npm run dev                # http://localhost:5173, proxies /api to :5000
```

## API

- `GET /api/progress/:learnerId` — fetch (or create) a learner's progress doc
- `PATCH /api/progress/:learnerId` — merge in progress fields (story understood, quiz answers,
  which simulator levels were completed, `lessonCompleted`)

## Notes / next steps

- `learnerId` is currently a random id stored in `localStorage` — swap for your real auth id
  once pyBe has login.
- The two MCQ sets (`ThinkItThrough.jsx`, `BuildItQuiz.jsx`) and the simulator's Python
  snippets (`TrySimulator.jsx`) are the easiest places to extend with more levels later.
- All illustrations are hand-drawn inline SVG (`BirdIllustration.jsx`) — no external image
  assets needed.
