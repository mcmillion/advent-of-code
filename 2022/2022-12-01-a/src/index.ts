import { readFile } from "fs/promises";

async function readInput() {
  const buffer = await readFile("./input.txt");
  const raw = buffer.toString().trim().split(/\r?\n/);
  const parsed = raw.map((line) => (line === "" ? null : parseInt(line, 10)));
  return parsed;
}

function calculateCalories(data: (number | null)[]) {
  let maxCalories = 0;
  let runningTotal = 0;

  for (const snack of data) {
    if (snack === null) {
      // Check for new maxCalories and reset runningTotal
      if (runningTotal > maxCalories) maxCalories = runningTotal;
      runningTotal = 0;
    } else {
      // Add new calories
      runningTotal += snack;
    }
  }

  console.log("MAX", maxCalories);
}

async function run() {
  const data = await readInput();
  calculateCalories(data);
}

run().catch((e) => console.log(e));
