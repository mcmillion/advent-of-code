import { readFile } from "fs/promises";

async function readInput() {
  const buffer = await readFile("./input.txt");
  const raw = buffer.toString().trim().split(/\r?\n/);
  const parsed = raw.map((line) => (line === "" ? null : parseInt(line, 10)));
  return parsed;
}

function calculateCalories(data: (number | null)[]) {
  const calories: number[] = [];
  let runningTotal = 0;

  for (const snack of data) {
    if (snack === null) {
      calories.push(runningTotal);
      runningTotal = 0;
    } else {
      runningTotal += snack;
    }
  }

  const topThree = calories
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3);
  const total = topThree.reduce((a, b) => a + b, 0);

  console.log("Result", total);
}

async function run() {
  const data = await readInput();
  calculateCalories(data);
}

run().catch((e) => console.log(e));
