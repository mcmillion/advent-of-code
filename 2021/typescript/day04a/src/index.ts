import { readFile } from "fs/promises";

// Holds a board square numnber and whether or not it is active
type BoardSquare = [number, boolean];

// Holds a 2D array of BoardSquares
type GameBoard = BoardSquare[][];

// Holds configuration fo the game, including the list of numbers and all boards
interface GameState {
  numbersToDraw: number[];
  lastDrawnNumber: number | null;
  boards: GameBoard[];
}

// Loads input into a game state
async function readGameConfiguration(): Promise<GameState> {
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
    numbersToDraw,
    lastDrawnNumber: null,
    boards,
  };
}

// Play a round of bingo with GameState
function playRound(state: GameState): GameState {
  // Get the next number to be called
  state.lastDrawnNumber = state.numbersToDraw.shift() ?? null;
  console.log("Drew a number: ", state.lastDrawnNumber);

  // Check each board and toggle numbers that match
  state.boards = state.boards.map((board) =>
    board.map((row) =>
      row.map((column) => [
        column[0],
        column[0] === state.lastDrawnNumber ? true : column[1],
      ])
    )
  );

  // Return the current state
  return state;
}

// Check all the board for a winner
function checkRound(state: GameState): number | undefined {
  let winner: number | undefined;

  // Check rows for a winner
  state.boards.map((board, boardIndex) =>
    board.map((row) => {
      if (row.every((column) => column[1])) winner = boardIndex;
    })
  );

  // Rotate board and then check again (this for horizontal
  // array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  state.boards.map((board, boardIndex) => {
    board
      // Rotate board
      .map((_, colIndex) => board.map((row) => row[colIndex]))
      // Find vertical winners with a horizontal approach
      .map((row) => {
        if (row.every((column) => column[1])) winner = boardIndex;
      });
  });

  return winner;
}

// Score a board
function scoreWinningBoard(state: GameState, winnerIndex: number) {
  if (state.lastDrawnNumber === null) return;

  const sum = state.boards[winnerIndex].reduce(
    (sum, row) =>
      sum +
      row.reduce(
        (sum, [value, marked]) => (marked ? sum : sum + value),
        0 as number
      ),
    0 as number
  );

  console.log("winnerIndex", winnerIndex);
  console.log("lastDrawnNumber", state.lastDrawnNumber);
  console.log("sum", sum);
  console.log("Winner: ", sum * state.lastDrawnNumber);
}

// Start the game loop
let state = await readGameConfiguration();
let hasWinner = false;
while (!hasWinner) {
  state = playRound(state);
  const winner = checkRound(state);

  if (winner) {
    hasWinner = true;
    scoreWinningBoard(state, winner);
  }
}
