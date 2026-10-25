const LETTERS = ["A", "B", "C", "D", "E", "F"];

// Convert a user's input ("b", " B ", "2") into a choice index, or -1 if invalid.
function parseAnswer(input, choiceCount) {
  const text = String(input).trim().toUpperCase();
  const byLetter = LETTERS.slice(0, choiceCount).indexOf(text);
  if (byLetter !== -1) return byLetter;
  const byNumber = Number(text);
  if (Number.isInteger(byNumber) && byNumber >= 1 && byNumber <= choiceCount) {
    return byNumber - 1;
  }
  return -1;
}

function formatQuestion(q, index, total) {
  const choices = q.choices.map((choice, i) => `  ${LETTERS[i]}) ${choice}`);
  return [`Question ${index + 1} of ${total}`, q.question, ...choices].join("\n");
}

function isCorrect(q, choiceIndex) {
  return choiceIndex === q.answer;
}

// Fisher-Yates shuffle on a copy so the source array is never mutated.
function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function calculateScore(results) {
  return results.filter((r) => r.correct).length;
}

function totalTime(results) {
  return results.reduce((sum, r) => sum + r.seconds, 0);
}

function getRank(percent) {
  if (percent === 100) return "Perfect! Trivia master!";
  if (percent >= 75) return "Great job!";
  if (percent >= 50) return "Not bad, keep practicing.";
  return "Better luck next time.";
}

module.exports = {
  parseAnswer,
  formatQuestion,
  isCorrect,
  shuffle,
  calculateScore,
  totalTime,
  getRank,
};
