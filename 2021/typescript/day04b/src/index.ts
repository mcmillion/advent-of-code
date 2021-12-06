import { readGameConfiguration } from "./configuration";
import { playRound } from "./play";
import { checkRound, scoreWinningBoard } from "./score";

async function runGame() {
  let state = await readGameConfiguration();
  while (state.boards.length) {
    state = playRound(state);
    checkRound(state);
  }

  scoreWinningBoard(state);
}

runGame().catch((e) => console.log(e));
