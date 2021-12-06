// Holds a board square numnber and whether or not it is active
type BoardSquare = [number, boolean];

// Holds a 2D array of BoardSquares
type GameBoard = BoardSquare[][];

// Holds configuration fo the game, including the list of numbers and all boards
interface GameState {
  boards: GameBoard[];
  lastDrawnNumber: number | null;
  numbersToDraw: number[];
  winningBoards: GameBoard[];
}
