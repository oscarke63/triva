const readline = require("node:readline");
const { questions } = require("./questions");
const {
  parseAnswer,
  formatQuestion,
  isCorrect,
  shuffle,
  calculateScore,
  totalTime,
  getRank,
} = require("./game");

const SECONDS_PER_QUESTION = 15;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let closed = false;
rl.on("close", () => {
  closed = true;
});

// Resolves with the line typed, or null if the timer expires / input ends.
function ask(prompt, timeoutSeconds) {
  return new Promise((resolve) => {
    if (closed) return resolve(null);
    let timer;
    const finish = (value) => {
      clearTimeout(timer);
      rl.removeListener("close", onClose);
      resolve(value);
    };
    const onClose = () => finish(null);
    rl.once("close", onClose);
    if (timeoutSeconds) {
      timer = setTimeout(() => {
        console.log("\n⏰ Time's up!");
        // Abandon the pending line; the next question() call replaces it.
        finish(null);
      }, timeoutSeconds * 1000);
    }
    rl.question(prompt, (answer) => finish(answer));
  });
}

async function askQuestion(q, index, total) {
  console.log(`\n${formatQuestion(q, index, total)}`);
  const started = Date.now();
  let choice = -1;
  let timedOut = false;

  while (choice === -1) {
    const remaining = SECONDS_PER_QUESTION - (Date.now() - started) / 1000;
    if (remaining <= 0) break;
    const input = await ask(`Your answer (A-${"ABCDEF"[q.choices.length - 1]}) [${Math.ceil(remaining)}s]: `, remaining);
    if (input === null) {
      timedOut = true;
      break;
    }
    choice = parseAnswer(input, q.choices.length);
    if (choice === -1) console.log("Invalid choice, please try again.");
  }

  const seconds = (Date.now() - started) / 1000;
  const correct = !timedOut && isCorrect(q, choice);
  const rightText = `${"ABCDEF"[q.answer]}) ${q.choices[q.answer]}`;
  console.log(correct ? "✅ Correct!" : `❌ Wrong. The answer was ${rightText}`);
  return { correct, seconds };
}

function showSummary(results, total) {
  const score = calculateScore(results);
  const percent = Math.round((score / total) * 100);
  console.log("\n=========== GAME OVER ===========");
  console.log(`Score: ${score}/${total} (${percent}%)`);
  console.log(`Total time: ${totalTime(results).toFixed(1)}s`);
  console.log(getRank(percent));
  results.forEach((r, i) =>
    console.log(`  Q${i + 1}: ${r.correct ? "✅" : "❌"} (${r.seconds.toFixed(1)}s)`)
  );
}

async function playGame() {
  const deck = shuffle(questions);
  const results = [];
  for (const [i, q] of deck.entries()) {
    results.push(await askQuestion(q, i, deck.length));
    if (closed) break;
  }
  showSummary(results, deck.length);
}

async function main() {
  console.log("=================================");
  console.log("        🧠 TRIVIA CLI 🧠         ");
  console.log("=================================");
  console.log(`Answer with a letter (A-D). You have ${SECONDS_PER_QUESTION}s per question.`);

  let playing = true;
  while (playing) {
    const start = await ask("\nPress Enter to start (or type 'q' to quit): ");
    if (start === null || start.trim().toLowerCase() === "q") break;
    await playGame();
    const again = await ask("\nPlay again? (y/n): ");
    playing = again !== null && again.trim().toLowerCase().startsWith("y");
  }
  console.log("\nThanks for playing! 👋");
  rl.close();
}

main();
