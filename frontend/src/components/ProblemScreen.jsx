const DUPLICATED_CODE = `class Duck:
    def eat(self):
        print("pecking at seeds")
    def sleep(self):
        print("resting on a branch")


class Flamingo:
    def eat(self):
        print("pecking at seeds")     # ...same code again
    def sleep(self):
        print("resting on a branch")  # ...same code again`;

export default function ProblemScreen({ onNext }) {
  return (
    <div className="card">
      <p className="eyebrow">Before the story</p>
      <h2 className="card-subtitle">What's wrong with this code?</h2>
      <p>
        Duck and Flamingo are both birds. Written like this, they don't share anything — every
        bird class repeats the exact same <code>eat()</code> and <code>sleep()</code> code.
      </p>
      <pre className="code-block">
        <code>{DUPLICATED_CODE}</code>
      </pre>
      <div className="concept-box">
        <p>
          Now imagine 10 bird classes, not 2. That's the same code copied 10 times — and if you
          ever find a bug in <code>eat()</code>, you'd have to fix it in every single one.
        </p>
        <p className="level-takeaway">Inheritance exists to solve exactly this problem.</p>
      </div>
      <button className="btn btn-primary" onClick={onNext}>
        There's a better way
      </button>
    </div>
  );
}
