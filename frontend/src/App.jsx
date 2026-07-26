import { useState } from "react";
import ClassesLesson from "./classes/ClassesLesson.jsx";
import InheritanceLesson from "./InheritanceLesson.jsx";

export default function App() {
  const [showClasses, setShowClasses] = useState(true);

  return showClasses
    ? <ClassesLesson onDone={() => setShowClasses(false)} />
    : <InheritanceLesson />;
}