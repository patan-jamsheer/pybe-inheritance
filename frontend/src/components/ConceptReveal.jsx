import InheritanceTree from "./InheritanceTree.jsx";

export default function ConceptReveal({ onNext }) {
  return (
    <div className="card">
      <p className="eyebrow">Here's the idea</p>
      <h2 className="card-subtitle">What is Inheritance?</h2>
      <p>
        <strong>Inheritance</strong> means a new class (the "child") automatically gets all the
        behavior of an existing class (the "parent") — without rewriting any of it. Here's the
        whole family at a glance:
      </p>
      <div className="tree-box">
        <InheritanceTree />
      </div>
      <div className="concept-box">
        <ul className="concept-list">
          <li>Eagle(Bird) → change nothing, just reuse everything as-is</li>
          <li>Sparrow(Bird) → keep everything, and add a brand-new method</li>
          <li>Penguin(Bird) → replace one method completely (override)</li>
          <li>Owl(Bird) → override a method but call super() to build on the original</li>
        </ul>
      </div>
      <p>You'll try all four, one at a time, in the next section — each one is its own level.</p>
      <button className="btn btn-primary" onClick={onNext}>
        Let's try them
      </button>
    </div>
  );
}
