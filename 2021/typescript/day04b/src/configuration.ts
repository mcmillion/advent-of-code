import { readFile } from "fs/promises";

// Loads input into a game state
export async function readGameConfiguration(): Promise<GameState> {
  // Read input into an array
  const buffer = await readFile("./input.txt");
  const data = buffer.toString().split(/\r?\n/);

  // Get the list of numbersToDraw by splitting it and parsing
  const numbersToDraw = data[0].split(",").map((x) => parseInt(x, 10));

  // Parse the boards into 2D arrays and pack them into a boards array
  // Board data starts at index 2
  let boardIndex = 0;
  let boardRowIndex = 0;
  const boards = data.slice(2).reduce((boards, row) => {
    // If the line is blank, start a new board
    if (row.trim() === "") {
      boardIndex++;
      boardRowIndex = 0;
      return boards;
    }

    // If this is a fresh board, set it up
    boards[boardIndex] ??= [];

    // Parse the line for the current board by splitting it
    boards[boardIndex][boardRowIndex] = row
      .trim()
      .split(/\s+/)
      .map((x) => [parseInt(x, 10), false]);
    boardRowIndex++;

    return boards;
  }, [] as GameBoard[]);

  return {
    boards,
    lastDrawnNumber: null,
    numbersToDraw,
    winningBoards: [],
  };
}
