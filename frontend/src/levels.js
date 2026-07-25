export const LEVEL_ORDER = ["inherit", "extend", "override", "superOverride"];

export const LEVELS = {
  inherit: {
    id: "inherit",
    badge: "LEVEL 1 · BASIC",
    title: "Getting everything for free",
    description:
      "The simplest form of inheritance: a child class that changes nothing at all still gets every method its parent has.",
    takeaway: "class Eagle(Bird): pass — and Eagle can already eat(), sleep(), and fly().",
    className: "Eagle(Bird)",
    illustration: "EagleChild",
    realWorld:
      "Same idea as class Manager(Employee): pass — a Manager is still an Employee, with nothing extra changed.",
    code: `class Eagle(Bird):
    pass`,
    methods: [
      { id: "eat", label: "Call eagle.eat()", lines: ["pecking at seeds  (inherited from Bird)"] },
      { id: "sleep", label: "Call eagle.sleep()", lines: ["resting on a branch  (inherited from Bird)"] },
      { id: "fly", label: "Call eagle.fly()", lines: ["gliding through the sky  (inherited from Bird)"] },
    ],
    nextLabel: "Next: Sparrow — adding something new",
  },

  extend: {
    id: "extend",
    badge: "LEVEL 2 · BASIC+",
    title: "Adding something new",
    description:
      "A child isn't limited to what the parent already has. Sparrow keeps every Bird habit and adds a brand-new one of its own: build_nest().",
    takeaway:
      "Inheritance isn't just reuse — a child class can extend the parent by adding methods the parent never had.",
    className: "Sparrow(Bird)",
    illustration: "SparrowChild",
    realWorld:
      "Same idea as class PremiumUser(User): def access_beta_features(self): ... — every User ability, plus one that's exclusive to Premium.",
    code: `class Sparrow(Bird):
    def build_nest(self):          # brand new — Bird never had this
        print("weaving twigs into a nest")`,
    methods: [
      { id: "eat", label: "Call sparrow.eat()", lines: ["pecking at seeds  (inherited from Bird)"] },
      { id: "fly", label: "Call sparrow.fly()", lines: ["gliding through the sky  (inherited from Bird)"] },
      {
        id: "build_nest",
        label: "Call sparrow.build_nest()",
        lines: ["weaving twigs into a nest  (new — only Sparrow has this)"],
        isNew: true,
      },
    ],
    nextLabel: "Next: Penguin — replacing behavior",
  },

  override: {
    id: "override",
    badge: "LEVEL 3 · MEDIUM",
    title: "Replacing what doesn't fit",
    description:
      "Penguin keeps most Bird habits, but flying doesn't fit its life at sea. So Penguin overrides fly() completely — same method name, totally new behavior.",
    takeaway:
      "Same method name, completely new behavior — once overridden, the parent's original version is never called.",
    className: "Penguin(Bird)",
    illustration: "PenguinChild",
    realWorld:
      "Same idea as class Circle(Shape): def area(self): ... — every shape has area(), but each one calculates it differently.",
    code: `class Penguin(Bird):
    def fly(self):                 # overrides Bird's fly() completely
        print("diving and swimming instead")`,
    methods: [
      { id: "eat", label: "Call penguin.eat()", lines: ["pecking at seeds  (inherited from Bird)"] },
      { id: "sleep", label: "Call penguin.sleep()", lines: ["resting on a branch  (inherited from Bird)"] },
      {
        id: "fly",
        label: "Call penguin.fly()",
        lines: ["diving and swimming instead  (overridden!)"],
        isOverride: true,
      },
    ],
    nextLabel: "Next: Owl — extending with super()",
  },

  superOverride: {
    id: "superOverride",
    badge: "LEVEL 4 · MEDIUM+",
    title: "Building on the parent's version",
    description:
      "Owl overrides sleep() too — but instead of throwing Bird's version away, it calls super().sleep() first, then adds its own twist on top.",
    takeaway:
      "super().sleep() runs the parent's original code first — then your own code runs after it. You extend instead of replace.",
    className: "Owl(Bird)",
    illustration: "OwlChild",
    realWorld:
      "Same idea as class AdminUser(User): def login(self): super().login(); log_admin_access() — runs the normal login, then adds extra behavior on top.",
    code: `class Owl(Bird):
    def sleep(self):
        super().sleep()            # run Bird's original version first
        print("then staying alert to hunt at night")`,
    methods: [
      { id: "eat", label: "Call owl.eat()", lines: ["pecking at seeds  (inherited from Bird)"] },
      { id: "fly", label: "Call owl.fly()", lines: ["gliding through the sky  (inherited from Bird)"] },
      {
        id: "sleep",
        label: "Call owl.sleep()",
        lines: [
          "resting on a branch  (Bird's original, via super())",
          "then staying alert to hunt at night  (added by Owl)",
        ],
        isOverride: true,
      },
    ],
    nextLabel: "See what I discovered",
  },
};
