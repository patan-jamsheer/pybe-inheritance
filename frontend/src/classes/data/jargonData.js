export const jargonExplanations = {
  class: {
    title: "Class",
    subtitle: "The Master Blueprint",
    summary: "A class is a blueprint or blank master template. Think of it like an empty form that every single player profile will copy and fill out.",
    details: [
      "Instead of writing repeating code for every player, you define the structure once.",
      "It groups both properties (like name, age) and behavior into one reusable concept."
    ],
    example: "class Player:\n    # Defines what every player object should contain"
  },
  init: {
    title: "__init__ Method",
    subtitle: "The Constructor / Setup Manager",
    summary: "The setup manager runs automatically behind the scenes to clean, build, and prepare a new player entry whenever a new instance is created.",
    details: [
      "The double underscores (dunder) signal special built-in Python behavior.",
      "It accepts arguments (like name, age, role) and attaches them to the specific instance being created."
    ],
    example: "def __init__(self, name, age, role):\n    self.name = name"
  },
  self: {
    title: "self Keyword",
    subtitle: "The Specific Instance Pointer",
    summary: "A placeholder meaning 'this specific player'. It guarantees Rohan's data stays assigned to Rohan without overwriting Virat.",
    details: [
      "In Python, 'self' explicitly references the instance executing the method.",
      "It keeps player data isolated so every player object manages its own independent state."
    ],
    example: "self.name = name  # Assigns 'name' to THIS specific player instance"
  }
};