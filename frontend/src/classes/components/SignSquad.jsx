import React, { useState, useEffect } from "react";
import { players } from "../data/players.js";
import { jargonExplanations } from "../data/jargonData.js";
import JargonModal from "./JargonModal.jsx";

// --- Inline SVG Icons ---
function StampIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22h14" />
      <path d="M19 17H5v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2z" />
      <path d="M12 13V8" />
      <path d="M10 4a2 2 0 1 1 4 0v4h-4V4z" />
    </svg>
  );
}

function PenIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function PlayerCard({ player, fast }) {
  return (
    <div className={"pcard enter" + (fast ? " fast" : "")}>
      <div className="nm">{player.name}</div>
      <div className="rl">{player.role}</div>
      <div className="ag">Age {player.age}</div>
    </div>
  );
}

function addCodeLine(setCodeLines, html, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      setCodeLines((prev) => [...prev, html]);
      resolve();
    }, delay);
  });
}

export default function SignSquad({ show, onDone  }) {
  const [appStage, setAppStage] = useState("manual");
  const [codeLines, setCodeLines] = useState([]);
  const [activeJargon, setActiveJargon] = useState(null);

  const [trayPlayers, setTrayPlayers] = useState(
    players.map((p, id) => ({ ...p, id }))
  );
  const [squadPlayers, setSquadPlayers] = useState([]);
  const [dotStates, setDotStates] = useState(["active", "", "", ""]);
  const [dropOver, setDropOver] = useState(false);
  const [hint, setHint] = useState("Drag all 3 reports in, one at a time.");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showLearnButton, setShowLearnButton] = useState(false);
  const [showTestButton, setShowTestButton] = useState(false);
  const [statText, setStatText] = useState(null);
  const [caption, setCaption] = useState(
    "Every report has to be typed in by hand — three lines per player, copy-pasted with small edits each time."
  );
  const [stagelabel, setStagelabel] = useState(
    "Stage 1 — drag each report into the squad list"
  );

  // --- STAGE 4 MULTI-STEP TEST STATES ---
  const [testSubStep, setTestSubStep] = useState(1);
  const [testPassed, setTestPassed] = useState(false);
  const [testFeedback, setTestFeedback] = useState("");
  const [targetLineSelected, setTargetLineSelected] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    if (appStage === "manual" && squadPlayers.length === players.length && squadPlayers.length > 0) {
      setHint("That's 9 lines of code for 3 players. Every future signing costs 3 more.");
      setShowNextButton(true);
    }
  }, [squadPlayers, appStage]);

  // --- 6-SECOND TIMEOUT FOR COMPLETION MODAL ---
  useEffect(() => {
    if (appStage === "test" && testSubStep === 3 && testPassed) {
      const timer = setTimeout(() => {
        setShowCompletionModal(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [appStage, testSubStep, testPassed]);

  async function signManually(p, idx) {
    const varName = "player" + (idx + 1);
    await addCodeLine(setCodeLines, `${varName}_name = <span class="str">"${p.name}"</span>`, 80);
    await addCodeLine(setCodeLines, `${varName}_age = ${p.age}`, 300);
    await addCodeLine(setCodeLines, `${varName}_role = <span class="str">"${p.role}"</span>`, 300);
    setSquadPlayers((prev) => [...prev, { player: p, fast: false }]);
  }

  function handleDragStart(e, id) {
    e.dataTransfer.setData("text/plain", String(id));
  }

  function handleDropzoneDragOver(e) {
    e.preventDefault();
    setDropOver(true);
  }

  function handleDropzoneDragLeave() {
    setDropOver(false);
  }

  async function handleDrop(e) {
    e.preventDefault();
    setDropOver(false);
    const idx = Number(e.dataTransfer.getData("text/plain"));
    const p = players[idx];
    if (!p) return;
    setTrayPlayers((prev) => prev.filter((t) => t.id !== idx));
    await signManually(p, idx);
  }

  async function runSmart() {
    setDotStates(["done", "active", "", ""]);
    setAppStage("smart");
    setStagelabel("Stage 2 — write the template once");
    setCaption(
      "Now the manager writes one blueprint for what every player needs. Signing anyone after that is a single line."
    );
    setCodeLines([]);
    setSquadPlayers([]);
    setTrayPlayers([]);
    setShowNextButton(false);
    setShowLearnButton(false);
    setShowTestButton(false);
    setStatText(null);

    await addCodeLine(setCodeLines, `<span class="kw"><span class="jargon-circle">class<span class="jargon-q" data-type="class">?</span></span></span> <span class="fn">Player</span>:`, 250);
    await addCodeLine(setCodeLines, `&nbsp;&nbsp;<span class="jargon-circle"><span class="kw">def</span> <span class="fn">__init__</span><span class="jargon-q" data-type="init">?</span></span>(self, name, age, role):`, 220);
    await addCodeLine(setCodeLines, `&nbsp;&nbsp;&nbsp;&nbsp;<span class="jargon-circle">self<span class="jargon-q" data-type="self">?</span></span>.name = name`, 220);
    await addCodeLine(setCodeLines, `&nbsp;&nbsp;&nbsp;&nbsp;self.age = age`, 220);
    await addCodeLine(setCodeLines, `&nbsp;&nbsp;&nbsp;&nbsp;self.role = role`, 220);
    await addCodeLine(setCodeLines, `<span class="placeholder">// written once — never again</span>`, 450);

    let lineCount = 6;
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const varName = p.name.toLowerCase();
      await addCodeLine(
        setCodeLines,
        `${varName} = <span class="fn">Player</span>(<span class="str">"${p.name}"</span>, ${p.age}, <span class="str">"${p.role}"</span>)`,
        320
      );
      lineCount++;
      setSquadPlayers((prev) => [...prev, { player: p, fast: true }]);
    }

    await new Promise((r) => setTimeout(r, 300));

    setStatText(
      `<b>${lineCount} lines total</b> — 6 for the template, 1 per player after that. Sign 50 more players and it's still just 1 line each.`
    );
    setShowLearnButton(true);
  }

  function startStage3() {
    setDotStates(["done", "done", "active", ""]);
    setAppStage("learn");
    setStagelabel("Stage 3 — Let's Learn");
    setCaption("Click on any highlighted keyword to explore how it works under the hood.");
    setShowLearnButton(false);
    setShowTestButton(true);
  }

  function startStage4() {
    setDotStates(["done", "done", "done", "active"]);
    setAppStage("test");
    setTestSubStep(1);
    setStagelabel("Stage 4 — Challenge 1: The Stamp Test");
    setCaption("Which tool sets up the master template for all future player profiles?");
    setShowTestButton(false);
    setTestFeedback("");
    setTestPassed(false);
    setShowCompletionModal(false);
  }

  function handleToolDrop(toolType) {
    if (toolType === "stamp") {
      setTestPassed(true);
      setTestFeedback("Spot on! The class acts as the stamp—it builds the empty template structure.");
    } else {
      setTestFeedback("Not quite! The pen types manual data for one specific player. Drag the stamp instead.");
    }
  }

  function handleCodeLineClick(index) {
    if (appStage !== "test" || testSubStep !== 2) return;
    
    if (index === 0) {
      setTargetLineSelected(true);
      setTestPassed(true);
      setTestFeedback("Correct! 'class Player:' controls everyone's template. Updating this updates all players!");
    } else {
      setTestFeedback("That line only creates or edits an individual player! Tap line 1 ('class Player:').");
    }
  }

  function handleScaleOption(choice) {
    if (choice === 1) {
      setTestPassed(true);
      setTestFeedback("Bingo! Just 1 class template. Then you call 'Player()' 100 times!");
    } else {
      setTestFeedback(`Writing ${choice} templates would mean duplicate work! You only need 1 blueprint.`);
    }
  }

  function goToNextSubStep() {
    if (testSubStep === 1) {
      setTestSubStep(2);
      setTestPassed(false);
      setTestFeedback("");
      setStagelabel("Stage 4 — Challenge 2: Target Practice");
      setCaption("Click on the code line that controls the master blueprint for the ENTIRE squad.");
    } else if (testSubStep === 2) {
      setTestSubStep(3);
      setTestPassed(false);
      setTestFeedback("");
      setStagelabel("Stage 4 — Challenge 3: 1 vs 100");
      setCaption("Scale Test: How many blueprints do you write for 100 players?");
    }
  }

  return (
    <div id="appView" className={show ? "show" : ""}>
      <h1>Sign the squad</h1>
      <p className="sub">Same manager task, two ways of writing it</p>

      <div className="stagebar">
        {dotStates.map((state, i) => (
          <div key={i} className={"dot " + state}></div>
        ))}
      </div>
      <div className="stagelabel">{stagelabel}</div>

      <div className="panels">
        {/* Code Panel */}
        <div 
          className={`code-panel ${appStage === "learn" ? "expanded" : ""} ${appStage === "test" && testSubStep === 2 ? "interactive-target" : ""}`}
          onClick={(e) => {
            if (appStage === "learn") {
              const qBtn = e.target.closest('.jargon-q');
              if (qBtn) {
                const type = qBtn.getAttribute('data-type');
                setActiveJargon(type);
              }
            }
          }}
        >
          {codeLines.length === 0 && (
            <span className="placeholder">// waiting for the manager to do something...</span>
          )}
          {codeLines.map((html, i) => (
            <div 
              key={i} 
              className={`code-line ${appStage === "test" && testSubStep === 2 ? "clickable-line" : ""} ${testSubStep === 2 && targetLineSelected && i === 0 ? "highlight-target" : ""}`}
              onClick={() => handleCodeLineClick(i)}
              dangerouslySetInnerHTML={{ __html: html }} 
            />
          ))}
        </div>

        {/* Desk Panel */}
        <div className="desk-panel">
          {appStage === "manual" && <div className="desk-title">Scouting reports</div>}

          {appStage === "manual" && (
            <div className="tray">
              {trayPlayers.map((p) => (
                <div
                  key={p.id}
                  className="pcard scrap enter"
                  draggable
                  onDragStart={(e) => handleDragStart(e, p.id)}
                >
                  {p.name},{p.age},{p.role}
                </div>
              ))}
            </div>
          )}

          {/* STAGE 4 MULTI-STEP TEST UI */}
          {appStage === "test" ? (
            <div className="test-container">
              
              {/* SUB-STEP 1: THE STAMP TEST */}
              {testSubStep === 1 && (
                <>
                  <p className="test-question stamp-question">
                    Drag the correct tool onto the blank card to set up the <b>master blueprint</b>:
                  </p>
                  <div className="tool-tray">
                    <div 
                      className="tool-card stamp-tool"
                      draggable 
                      onDragStart={(e) => e.dataTransfer.setData("tool", "stamp")}
                    >
                      <div className="tool-icon-wrapper stamp-bg"><StampIcon size={24} /></div>
                      <code>class Player</code>
                      <div className="tool-caption">Rubber Stamp</div>
                    </div>
                    <div 
                      className="tool-card pen-tool"
                      draggable 
                      onDragStart={(e) => e.dataTransfer.setData("tool", "pen")}
                    >
                      <div className="tool-icon-wrapper pen-bg"><PenIcon size={24} /></div>
                      <code>player1_name = "Rohan"</code>
                      <div className="tool-caption">Manual Pen</div>
                    </div>
                  </div>

                  <div 
                    className={`blank-card-target ${testPassed ? "stamped" : ""}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleToolDrop(e.dataTransfer.getData("tool"));
                    }}
                  >
                    {testPassed ? (
                      <div className="stamped-success">
                        <div className="stamp-badge"><StampIcon size={14} /> CLASS TEMPLATE CREATED</div>
                        <p className="stamp-success-note">Ready for signing players!</p>
                      </div>
                    ) : (
                      <div className="drop-prompt">Drop the Blueprint tool here</div>
                    )}
                  </div>
                </>
              )}

              {/* SUB-STEP 2: TARGET PRACTICE */}
              {testSubStep === 2 && (
                <div className="target-practice-prompt">
                  <p className="test-question target-question">
                    👈 Tap the line in the <b>code panel</b> that defines the blueprint for ALL players:
                  </p>
                  <div className="target-instruction-box">
                    <span>Target: Find the line that creates the <code>class</code> structure.</span>
                  </div>
                </div>
              )}

              {/* SUB-STEP 3: 1 VS 100 */}
              {testSubStep === 3 && (
                <div className="scale-test-container">
                  <p className="test-question scale-question">
                    BCCI sends <b>100 new players</b> for trials! How many <code>class</code> blueprints do you need to write in code?
                  </p>
                  
                  {/* Buttons Layout */}
                  <div className="choices-tray">
                    {[100, 3, 1].map((val) => (
                      <button 
                        key={val} 
                        className={`choice-btn ${testPassed && val === 1 ? "correct-choice" : ""}`}
                        onClick={() => handleScaleOption(val)}
                      >
                        {val} {val === 1 ? "Blueprint" : "Blueprints"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FEEDBACK DISPLAY */}
              {testFeedback && (
                <div className={`test-feedback ${testPassed ? "success" : "error"}`}>
                  {testFeedback}
                </div>
              )}

              {testPassed && testSubStep < 3 && (
                <button className="gold sub-next-btn" onClick={goToNextSubStep}>
                  Next Challenge →
                </button>
              )}

              {testPassed && testSubStep === 3 && (
                <div className="completion-badge">
                  🏆 Mastered! You understand OOP Classes!
                </div>
              )}
            </div>
          ) : (
            /* STAGES 1, 2, 3 SQUAD LIST UI */
            <>
              <div className="dropzone-label">
                {appStage === "manual" ? "Drag a report here to sign the player" : "Squad list"}
              </div>

              <div
                className={"dropzone" + (dropOver ? " over" : "")}
                onDragOver={handleDropzoneDragOver}
                onDragLeave={handleDropzoneDragLeave}
                onDrop={handleDrop}
              >
                {squadPlayers.map((sp, i) => (
                  <PlayerCard key={i} player={sp.player} fast={sp.fast} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="controls">
        {appStage === "manual" && <div className="stat">{hint}</div>}
        
        {appStage === "manual" && showNextButton && (
          <button className="gold" onClick={runSmart}>There's a faster way →</button>
        )}

        {(appStage === "smart" || appStage === "learn") && statText && (
          <div className="stat gold" dangerouslySetInnerHTML={{ __html: statText }} />
        )}

        {appStage === "smart" && showLearnButton && (
          <button className="gold" onClick={startStage3}>Let's learn →</button>
        )}

        {appStage === "learn" && showTestButton && (
          <button className="gold" onClick={startStage4}>Test your knowledge →</button>
        )}
      </div>

      <p className="caption">{caption}</p>

      <JargonModal 
        jargonKey={activeJargon}
        content={jargonExplanations[activeJargon]}
        onClose={() => setActiveJargon(null)}
      />

      {/* COMPLETION POP-UP MODAL */}
      {showCompletionModal && (
        <div className="completion-modal-overlay">
          <div className="completion-modal-card">
            <div className="completion-modal-emoji">🎉</div>
            <h2 className="completion-modal-title">
              Completed the Module!
            </h2>
            <p className="completion-modal-text">
              Awesome work! You've successfully mastered the fundamentals of OOP Classes & Blueprints.
            </p>
            <button 
              className="completion-modal-close-btn"
              onClick={() =>{ setShowCompletionModal(false);
                onDone && onDone();
              }}
            >
            Continue to Inheritance →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}