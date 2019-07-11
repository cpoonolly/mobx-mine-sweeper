import { MineSweeperGame } from './MineSweeperGame';
import { autorun } from 'mobx';

describe('MineSweeperGame', () => {
  test('should be able to initialize class', () => {
    let game = new MineSweeperGame(0, 0, 0);
    autorun(() => console.log(`GameState:\n${game.toString()}`));

    expect(game).not.toBeUndefined();
  });
  
  test('should be able to initialize game', () => {
    let game = new MineSweeperGame(2, 3, 4);
    autorun(() => console.log(`GameState:\n${game.toString()}`));
  
    expect(game.numRows).toBe(3);
    expect(game.numCols).toBe(4);
  
    expect(game.grid.length).toBe(3);
    expect(game.grid[0].length).toBe(4);
  
    expect(game.numMines).toBe(2);
  });

  test('printing game state', () => {
    let game = new MineSweeperGame(0, 5, 5);
    autorun(() => console.log(`GameState:\n${game.toString()}`));

    console.log('setting mine 1');
    game.grid[2][2].isMine = true;
    
    console.log('setting mine 2');
    game.grid[0][0].isMine = true;
  });
});