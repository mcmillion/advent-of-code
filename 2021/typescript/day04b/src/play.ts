// Play a round of bingo with GameState
export function playRound(state: GameState): GameState {
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
