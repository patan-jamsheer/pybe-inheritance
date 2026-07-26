import { useState } from "react";
import StoryCard from "./StoryCard.jsx";
import { STORY_CARDS } from "./storyContent.js";

export default function StoryScreen({ onNext }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  const total = STORY_CARDS.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const card = STORY_CARDS[index];

  function goPrev() {
    if (isFirst) return;
    setDirection("backward");
    setIndex((i) => i - 1);
  }

  function goNextCard() {
    if (isLast) return;
    setDirection("forward");
    setIndex((i) => i + 1);
  }

  return (
    <div className="card">
      <h1 className="card-title">The Bird Family</h1>

      <p className="story-progress-caption">
        Story {index + 1} of {total}
      </p>
      <div className="story-progress-dots" aria-hidden="true">
        {STORY_CARDS.map((c, i) => (
          <span key={c.id} className={"story-dot" + (i <= index ? " filled" : "")} />
        ))}
      </div>

      <div className="story-card-viewport">
        {/* key forces a clean remount per card so the enter animation and
            the typewriter both restart from scratch */}
        <StoryCard key={card.id} card={card} direction={direction} />
      </div>

      <div className="story-nav-row">
        <button className="btn small" onClick={goPrev} disabled={isFirst}>
          ← Previous
        </button>

        {isLast ? (
          <button className="btn btn-primary" onClick={onNext}>
            I understood the story
          </button>
        ) : (
          <button className="btn small active" onClick={goNextCard}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}