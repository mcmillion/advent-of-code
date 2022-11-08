import { readFile } from "fs/promises";

export async function readMapCoords(): Promise<Line[]> {
  // Read the input into an array
  const buffer = await readFile("./input.txt");
  const data = buffer.toString().trim().split(/\r?\n/);

  // Parse coords into chart
  return data.map((line) => {
    const match = line.match(/(\d*),(\d*) -> (\d*),(\d*)/);

    if (!match) throw new Error("Invalid coordinate data");

    const [a1, a2, b1, b2] = match.slice(1).map((x) => parseInt(x, 10));
    return [
      [a1, a2],
      [b1, b2],
    ];
  });
}
