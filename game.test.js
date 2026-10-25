const test = require("node:test");
const assert = require("node:assert");
const g = require("./game");
const { questions } = require("./questions");

test("parseAnswer accepts letters and numbers, rejects junk", () => {
  assert.strictEqual(g.parseAnswer("b", 4), 1);
  assert.strictEqual(g.parseAnswer(" D ", 4), 3);
  assert.strictEqual(g.parseAnswer("3", 4), 2);
  assert.strictEqual(g.parseAnswer("e", 4), -1);
  assert.strictEqual(g.parseAnswer("", 4), -1);
  assert.strictEqual(g.parseAnswer("5", 4), -1);
});

test("isCorrect and calculateScore", () => {
  assert.ok(g.isCorrect({ answer: 2 }, 2));
  assert.ok(!g.isCorrect({ answer: 2 }, 1));
  assert.strictEqual(g.calculateScore([{ correct: true }, { correct: false }, { correct: true }]), 2);
});

test("totalTime sums seconds", () => {
  assert.strictEqual(g.totalTime([{ seconds: 1.5 }, { seconds: 2 }]), 3.5);
});

test("shuffle keeps items and does not mutate", () => {
  const src = [1, 2, 3, 4, 5];
  const out = g.shuffle(src);
  assert.deepStrictEqual([...out].sort(), src);
  assert.deepStrictEqual(src, [1, 2, 3, 4, 5]);
});

test("getRank tiers", () => {
  assert.match(g.getRank(100), /Perfect/);
  assert.match(g.getRank(0), /luck/);
});

test("question bank is well-formed", () => {
  for (const q of questions) {
    assert.ok(q.answer >= 0 && q.answer < q.choices.length);
  }
});
