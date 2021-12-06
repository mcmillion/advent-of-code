// Check all the board for a winner
export function checkRound(state: GameState) {
  // Check rows for a winner
  state.boards.map((board, boardIndex) =>
    board.map((row) => {
      if (row.every((column) => column[1])) {
        pullWinningBoard(state, boardIndex);
      }
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
        if (row.every((column) => column[1])) {
          pullWinningBoard(state, boardIndex);
        }
      });
  });
}

function pullWinningBoard(state: GameState, index: number) {
  state.winningBoards.push(state.boards.splice(index, 1)[0]);
}

// Score a board
export function scoreWinningBoard(state: GameState) {
  if (state.lastDrawnNumber === null) return;

  const winner = state.winningBoards[state.winningBoards.length - 1];
  const sum = winner.reduce(
    (sum, row) =>
      sum +
      row.reduce(
        (sum, [value, marked]) => (marked ? sum : sum + value),
        0 as number
      ),
    0 as number
  );

  console.log("lastDrawnNumber", state.lastDrawnNumber);
  console.log("sum", sum);
  console.log("Winner: ", sum * state.lastDrawnNumber);
}
