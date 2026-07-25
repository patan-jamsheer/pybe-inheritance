# Product File — "The Bird Family" (Inheritance Feature)

**Author:** Patan Jamsheer (Team)
**Email:** jamsheerkhan118@gmail.com
**Parent Project:** [pyBe](https://github.com/vicharanashala/pybe)

## 1. Problem

Learners typically meet inheritance as an abstract syntax rule (`class Child(Parent):`) with a
toy example, memorize it, and move on without an intuitive sense of *why* it exists or *when* to
reach for it.

## 2. Solution

A single connected story — a family of birds — used to teach four distinct, real inheritance
concepts, each as its own level, with hands-on code simulation and comprehension checks at every
step. The learner never just reads; every screen asks them to predict, try, or answer before
moving forward.

## 3. Concepts Covered

| Level | Bird | Concept | Real-world parallel |
|---|---|---|---|
| 1 · Basic | Eagle | Plain inheritance — reuse everything as-is | `class Manager(Employee): pass` |
| 2 · Basic+ | Sparrow | Extending — add a new method the parent lacks | `class PremiumUser(User): def access_beta_features(self)` |
| 3 · Medium | Penguin | Overriding — fully replace a method | `class Circle(Shape): def area(self)` |
| 4 · Medium+ | Owl | Overriding + `super()` — extend, don't replace | `class AdminUser(User): def login(self): super().login(); ...` |
1. **Story screen** — the Bird Family narrative, all four concepts planted in plain language
2. **Reflect prompt** — open-ended question + reveal
3. **Think it through** — 5 MCQs testing the pattern (story-level, no code yet)
4. **Concept reveal** — plain-English definitions + a visual family-tree diagram
5. **Build it quiz** — 4 MCQs mapping story elements to Python syntax
6. **Code builder** — 8 small steps, starting from "what is a class," building the whole program
   one method/class at a time; each step quotes the exact story line it comes from, and shows
   only what's new (the rest of the code stays visible but dimmed) — nothing is shown before it's
   explained, and the "full code together" view emerges naturally at the last step instead of
   being dumped on the learner all at once
7. **Four levels**, each: intro (with real-world parallel) → interactive simulator → recap beat
8. **Final recap** — four summary tiles, one per concept
## 5. Tech Stack

- **Frontend:** React 18 + Vite. One component per screen; flow is a single ordered step list
  (`STEPS` in `App.jsx`) driven by a `stepIndex`. All four levels' content (copy, code, method
  outputs) live in one data file, `levels.js` — components are generic and data-driven, so adding
  a 5th level means adding one object, not new components.
- **Backend:** Express + MongoDB (Mongoose). One `Progress` model tracks, per learner: which
  quizzes were answered and whether correct, which levels were completed, and whether the lesson
  was finished.
- **API:** `GET /api/progress/:learnerId`, `PATCH /api/progress/:learnerId`.

## 6. Repo Structure

```
pybe-inheritance/
├── backend/     Express + MongoDB
├── frontend/    React + Vite (the lesson UI)
└── docs/        this file, idea-summary.md, principles.md
```

## 7. How to Run

See `README.md` in the repo root for setup and run instructions (backend `.env`, `npm install`,
`npm run dev` for both).

## 8. Team

Built by Patan Jamsheer's team as their single-feature contribution to pyBe. One member raises
the PR to the pyBe repo carrying every teammate's contribution.
