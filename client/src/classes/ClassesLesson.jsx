
import { useState, useEffect } from "react";
import Scene from "./components/Scene.jsx";
import SignSquad from "./components/SignSquad.jsx";
import "./classes.css";

export default function ClassesLesson({ onDone }) {
  const [sceneClasses, setSceneClasses] = useState("");
  const [sceneHidden, setSceneHidden] = useState(false);
  const [appMounted, setAppMounted] = useState(false);
  const [appVisible, setAppVisible] = useState(false);

  function handleTryItOut() {
    setSceneClasses("fadeout");
    setTimeout(() => {
      setSceneHidden(true);
      setAppMounted(true);
    }, 500);
  }

  useEffect(() => {
    if (appMounted) {
      const t = setTimeout(() => setAppVisible(true), 20);
      return () => clearTimeout(t);
    }
  }, [appMounted]);

  return (
    <div className="stage-outer">
      {!sceneHidden && (
        <Scene sceneClasses={sceneClasses} onTryItOut={handleTryItOut} />
      )}
      {appMounted && <SignSquad show={appVisible} onDone={onDone} />}
    
      
    </div>
  );
}