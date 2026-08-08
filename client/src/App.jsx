import { useState } from "react";
import ClassesLesson from "./classes/ClassesLesson.jsx";
import InheritanceLesson from "./InheritanceLesson.jsx";

export default function App() {
  const [currentLesson, setCurrentLesson] = useState("classes");

  return (
    <>
      {currentLesson === "classes" && (
        <ClassesLesson onDone={() => setCurrentLesson("inheritance")} />
      )}
      {currentLesson === "inheritance" && <InheritanceLesson />}
    </>
  );
}
