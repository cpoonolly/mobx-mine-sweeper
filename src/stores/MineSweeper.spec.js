import { MineSweeperGame, Cell } from './MineSweeper';
import { autorun } from 'mobx';

describe('MineSweeperGame', () => {
  let game;

  beforeEach(() => {
    game = new MineSweeperGame();
    autorun(() => console.log(`GameState:\n${game.toString()}`));
  })

  test('should be able to initialize class', () => {
    expect(game).not.toBeUndefined();
  });
  
  test('should be able to initialize game', () => {
    game.initializeGame(2, 3, 4);
  
    expect(game.numRows).toBe(3);
    expect(game.numCols).toBe(4);
  
    expect(game.grid.length).toBe(3);
    expect(game.grid[0].length).toBe(4);
  
    expect(game.numMines).toBe(2);
  });

  test('printing game state', () => {
    game.initializeGame(0, 5, 5);

    console.log('setting mine 1');
    game.grid[2][2].isMine = true;
    
    console.log('setting mine 2');
    game.grid[0][0].isMine = true;
  });
});