const CODE = `class Bird:
    def eat(self):
        print("pecking at seeds")

    def sleep(self):
        print("resting on a branch")

    def fly(self):
        print("gliding through the sky")


class Eagle(Bird):
    pass  # 1. plain inheritance — nothing changes


class Sparrow(Bird):
    def build_nest(self):  # 2. extending — a brand-new method
        print("weaving twigs into a nest")


class Penguin(Bird):
    def fly(self):  # 3. overriding — fully replaced
        print("diving and swimming instead")


class Owl(Bird):
    def sleep(self):  # 4. overriding + super() — extends, doesn't replace
        super().sleep()
        print("then staying alert to hunt at night")`;

export default function CodeReveal({ onNext }) {
  return (
    <div className="card">
      <h2 className="card-title">That's the whole idea, written in Python.</h2>
      <pre className="code-block">
        <code>{CODE}</code>
      </pre>
      <button className="btn btn-primary" onClick={onNext}>
        Try it myself
      </button>
    </div>
  );
}
