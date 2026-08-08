import { useState } from "react";
import { LEVELS } from "../levels.js";

import { EagleChild, SparrowChild, PenguinChild, OwlChild, DuckChild } from "./BirdIllustration.jsx";

const ILLUSTRATIONS = {
  EagleChild,
  SparrowChild,
  PenguinChild,
  OwlChild,
  DuckChild,
};

export default function TrySimulator({ levelId, onComplete }) {
  const level = LEVELS[levelId];
  const Illustration = ILLUSTRATIONS[level.illustration];
  const [calledIds, setCalledIds] = useState([]);
  const [log, setLog] = useState([]);
  const [activeMethod, setActiveMethod] = useState(null);

  const done = calledIds.length === level.methods.length;

  function call(method) {
    setActiveMethod(method.id);
    setLog((prev) => [
      ...prev,
      ...method.lines.map((text) => ({ text, isNew: method.isNew, isOverride: method.isOverride })),
    ]);
    if (!calledIds.includes(method.id)) {
      setCalledIds((prev) => [...prev, method.id]);
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Try it yourself</h2>
      <p className="eyebrow">{level.badge}</p>

      <div className="simulator-grid">
        <div className="simulator-visual">
          <Illustration size={100} />
          <p className="class-name">{level.className}</p>
        </div>

        <div className="simulator-code">
          <pre className="code-block small">
            <code>{level.code}</code>
          </pre>
        </div>
      </div>

      <div className="method-buttons">
        {level.methods.map((m) => (
          <button
            key={m.id}
            className={"btn btn-secondary small" + (activeMethod === m.id ? " active" : "")}
            onClick={() => call(m)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="console-log">
        {log.length === 0 && <p className="console-placeholder">Output will appear here…</p>}
        {log.map((line, i) => (
          <p
            key={i}
            className={
              "console-line" + (line.isNew ? " highlight-new" : line.isOverride ? " highlight" : "")
            }
          >
            {">"} {line.text}
          </p>
        ))}
      </div>

      <p className="progress-caption">
        {calledIds.length}/{level.methods.length} methods tried
      </p>

      <button className="btn btn-primary" disabled={!done} onClick={onComplete}>
        {level.nextLabel}
      </button>
    </div>
  );
}
