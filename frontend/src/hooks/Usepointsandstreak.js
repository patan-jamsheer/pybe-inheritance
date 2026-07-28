import { useRef, useState } from "react";

const POINTS_STORAGE_KEY = "pybe_points";
const STREAK_STORAGE_KEY = "pybe_streak";
const LAST_LEARNING_DATE_KEY = "pybe_last_learning_date";
const LEVELS_COMPLETED_STORAGE_KEY = "pybe_levels_completed";

// Point values live here and nowhere else — tweak freely.
const STORY_SECTION_POINTS = 60; // spread across all story cards
const CONCEPT_SECTION_POINTS = 40; // spread across the concept section
const QUIZ_SECTION_POINTS = 80; // spread across quiz questions
const LEVEL_BONUS_POINTS = 50; // flat bonus per completed level

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function readStoredNumber(key, fallback = 0) {
  const raw = localStorage.getItem(key);
  const parsed = raw === null ? NaN : Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Encapsulates the points + learning-streak system: state, localStorage
 * persistence, and the point-awarding rules. App.jsx just calls the
 * record* functions from the existing progress callbacks/step logic —
 * no gamification math lives in App.jsx itself.
 */
export default function usePointsAndStreak() {
  const [points, setPoints] = useState(() => readStoredNumber(POINTS_STORAGE_KEY, 0));
  const [streak, setStreak] = useState(() => readStoredNumber(STREAK_STORAGE_KEY, 0));
  const [levelsCompleted, setLevelsCompleted] = useState(() =>
    readStoredNumber(LEVELS_COMPLETED_STORAGE_KEY, 0)
  );

  // Independent "last seen" trackers per section, so points are awarded
  // on each incremental gain no matter how progress state is reused
  // elsewhere in the app across different steps.
  //
  // These start at `null` (not 0) on purpose: several screens report an
  // initial "baseline" progress value the instant they mount (e.g. a
  // progress bar that opens already at 10%), and that first report is
  // not something the learner *did* — it's just the screen loading. If
  // the ref started at 0, that baseline would look like a jump from 0
  // and award free points before any real action. Treating the first
  // report per section as "here's where we're starting from" (no
  // points) and only awarding points on every report after that fixes
  // it, without changing what any screen displays.
  const lastStoryProgress = useRef(null);
  const lastConceptProgress = useRef(null);
  const lastQuizProgress = useRef(null);

  // Guards the streak day-check so it only ever runs once per mount,
  // and only from inside addPoints — i.e. only once the learner has
  // actually earned real points from a real action, never just from a
  // screen loading. That keeps a brand-new learner's streak at 0 until
  // they've done something, instead of jumping to 1 on page load.
  const streakChecked = useRef(false);

  function checkStreak() {
    if (streakChecked.current) return;
    streakChecked.current = true;

    const today = todayKey();
    const lastDate = localStorage.getItem(LAST_LEARNING_DATE_KEY);

    if (lastDate === today) return; // already counted today

    const nextStreak = lastDate === yesterdayKey() ? readStoredNumber(STREAK_STORAGE_KEY, 0) + 1 : 1;

    localStorage.setItem(STREAK_STORAGE_KEY, String(nextStreak));
    localStorage.setItem(LAST_LEARNING_DATE_KEY, today);
    setStreak(nextStreak);
  }

  function addPoints(amount) {
    if (!amount) return;
    checkStreak();
    setPoints((prev) => {
      const next = prev + amount;
      localStorage.setItem(POINTS_STORAGE_KEY, String(next));
      return next;
    });
  }

  function recordProgress(ref, value, sectionPoints) {
    if (ref.current === null) {
      // First report for this section this session — establish the
      // baseline silently, don't award points for it.
      ref.current = value;
      return;
    }
    const prevValue = ref.current;
    const delta = Math.max(0, value - prevValue);
    ref.current = value;
    if (delta > 0) {
      addPoints(Math.round((delta / 100) * sectionPoints));
    }
  }

  function recordStoryProgress(value) {
    recordProgress(lastStoryProgress, value, STORY_SECTION_POINTS);
  }

  function recordConceptProgress(value) {
    recordProgress(lastConceptProgress, value, CONCEPT_SECTION_POINTS);
  }

  function recordQuizProgress(value) {
    recordProgress(lastQuizProgress, value, QUIZ_SECTION_POINTS);
  }

  function recordLevelComplete() {
    addPoints(LEVEL_BONUS_POINTS);
    setLevelsCompleted((prev) => {
      const next = prev + 1;
      localStorage.setItem(LEVELS_COMPLETED_STORAGE_KEY, String(next));
      return next;
    });
  }

  // Restarting the lesson clears points/levels earned this run, but a
  // daily streak is about the learning habit, not one lesson — it's
  // left alone here on purpose.
  function resetAll() {
    localStorage.removeItem(POINTS_STORAGE_KEY);
    localStorage.removeItem(LEVELS_COMPLETED_STORAGE_KEY);
    lastStoryProgress.current = null;
    lastConceptProgress.current = null;
    lastQuizProgress.current = null;
    setPoints(0);
    setLevelsCompleted(0);
  }

  return {
    points,
    streak,
    levelsCompleted,
    recordStoryProgress,
    recordConceptProgress,
    recordQuizProgress,
    recordLevelComplete,
    resetAll,
  };
}
