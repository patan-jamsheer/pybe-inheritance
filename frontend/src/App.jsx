import { useEffect, useState } from "react";
import StoryScreen from "./components/StoryScreen.jsx";
import ReflectPrompt from "./components/ReflectPrompt.jsx";
import ThinkItThrough from "./components/ThinkItThrough.jsx";
import ConceptReveal from "./components/ConceptReveal.jsx";
import BuildItQuiz from "./components/BuildItQuiz.jsx";
import CodeBuilder from "./components/CodeBuilder.jsx";
import LevelIntro from "./components/LevelIntro.jsx";
import TrySimulator from "./components/TrySimulator.jsx";
import LevelComplete from "./components/LevelComplete.jsx";
import Recap from "./components/Recap.jsx";
import { LEVELS, LEVEL_ORDER } from "./levels.js";
import { saveProgress } from "./api.js";

// Fixed steps, then intro -> simulate -> complete per level in LEVEL_ORDER, then recap.
const FIXED_STEPS = ["story", "reflect", "think", "concept", "build", "code"];
const STEPS = [
  ...FIXED_STEPS,
  ...LEVEL_ORDER.flatMap((id) => [`intro-${id}`, `simulate-${id}`, `complete-${id}`]),
  "recap",
];

function getLearnerId() {
  let id = localStorage.getItem("pybe_learner_id");
  if (!id) {
    id = "learner-" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("pybe_learner_id", id);
  }
  return id;
}

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const learnerId = getLearnerId();
  const step = STEPS[stepIndex];

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function restart() {
    setStepIndex(0);
  }

  useEffect(() => {
    saveProgress(learnerId, { lastStep: step }).catch(() => {});
  }, [step]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="brand">pyBe · The Bird Family</p>
        <div className="feather-trail">
          {STEPS.map((s, i) => (
            <span key={s} className={"feather" + (i <= stepIndex ? " filled" : "")} />
          ))}
        </div>
      </header>

      <main className="app-main">
        {step === "story" && <StoryScreen onNext={goNext} />}

        {step === "reflect" && (
          <ReflectPrompt
            question="What do you think all the birds in this family have in common?"
            hint="Every bird starts out knowing the same basic habits — eating, sleeping, laying eggs — because they all come from the same parent, Bird."
            onNext={goNext}
          />
        )}

        {step === "think" && (
          <ThinkItThrough
            onDone={(answers) => {
              saveProgress(learnerId, {
                thinkItThrough: Object.entries(answers).map(([questionId, a]) => ({
                  questionId,
                  selected: a.optId,
                  correct: a.isCorrect,
                })),
              }).catch(() => {});
              goNext();
            }}
          />
        )}

        {step === "concept" && <ConceptReveal onNext={goNext} />}

        {step === "build" && (
          <BuildItQuiz
            onDone={(answers) => {
              saveProgress(learnerId, {
                buildItAnswers: Object.entries(answers).map(([questionId, selected]) => ({
                  questionId,
                  selected,
                })),
              }).catch(() => {});
              goNext();
            }}
          />
        )}

        {step === "code" && <CodeBuilder onDone={goNext} />}

        {LEVEL_ORDER.map((id) =>
          step === `intro-${id}` ? (
            <LevelIntro key={id} level={LEVELS[id]} onStart={goNext} />
          ) : null
        )}

        {LEVEL_ORDER.map((id) =>
          step === `simulate-${id}` ? (
            <TrySimulator
              key={id}
              levelId={id}
              onComplete={() => {
                const isLast = id === LEVEL_ORDER[LEVEL_ORDER.length - 1];
                saveProgress(learnerId, {
                  [`simulatorSteps.${id}Completed`]: true,
                  ...(isLast ? { lessonCompleted: true } : {}),
                }).catch(() => {});
                goNext();
              }}
            />
          ) : null
        )}

        {LEVEL_ORDER.map((id) =>
          step === `complete-${id}` ? (
            <LevelComplete
              key={id}
              level={LEVELS[id]}
              isLast={id === LEVEL_ORDER[LEVEL_ORDER.length - 1]}
              onContinue={goNext}
            />
          ) : null
        )}

        {step === "recap" && <Recap onRestart={restart} />}
      </main>
    </div>
  );
}