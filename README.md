# Trivia CLI

A command-line trivia game written in JavaScript (Node.js, no dependencies).

## Features
- Sequential multiple-choice questions, shuffled each game
- Answer with a letter (A-D) or number (1-4); invalid input is re-prompted
- Instant feedback after each answer
- 15-second timer per question (`setTimeout`) and total game time
- Final score, percentage, rank message and per-question breakdown
- Play again without restarting

## Run
Requires Node.js 18+.

```
npm start
```

## Structure
- `index.js` – CLI I/O, timers, game flow
- `game.js` – pure helpers (parsing, scoring, shuffle) using `map`, `filter`, `reduce`
- `questions.js` – question bank (array of objects)
