const questions = [
  {
    question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
    choices: ["var", "let", "const", "static"],
    answer: 2,
  },
  {
    question: "What does `typeof null` return in JavaScript?",
    choices: ["'null'", "'object'", "'undefined'", "'number'"],
    answer: 1,
  },
  {
    question: "Which array method returns a new array of the items that pass a test?",
    choices: ["map", "forEach", "filter", "reduce"],
    answer: 2,
  },
  {
    question: "What is the result of `'5' + 3`?",
    choices: ["8", "'53'", "NaN", "TypeError"],
    answer: 1,
  },
  {
    question: "Which function schedules code to run once after a delay?",
    choices: ["setInterval", "setTimeout", "requestDelay", "wait"],
    answer: 1,
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    choices: ["JSON.stringify", "JSON.parse", "JSON.convert", "Object.from"],
    answer: 1,
  },
  {
    question: "What does `Array.prototype.reduce` ultimately return?",
    choices: ["A new array", "A single accumulated value", "undefined", "A boolean"],
    answer: 1,
  },
  {
    question: "Which operator checks both value and type equality?",
    choices: ["==", "=", "===", "!="],
    answer: 2,
  },
];

module.exports = { questions };
