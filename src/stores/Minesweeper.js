import chance from 'chance';
import _ from 'lodash';

class MineSweeperGame {
  grid = [];
  
  initializeGame(numMines, numRows, numCols) {
    this.grid = new Array(numRows); // TODO: use observable.array?

    for (let row = 0; row < numRows; row++) {
      this.grid[row] = new Array(numCols);

      for (let col = 0; col < numCols; col++) {
        this.grid[row][col] = new Cell(this, row, col);
      } 
    }

    const cells = _.flatten(this.grid);
    chance.pickset(cells, numMines).forEach(cell => cell.isMine = true);
  }



  get numMines() {
    return _(this.grid).flatten().filter(cell => cell.isMine).size();
  }

  get numFlagged() {
    return _(this.grid).flatten().filter(cell => cell.isFlagged).size();
  }

  get numFlaggedMines() {
    return _(this.grid).flatten().filter(cell => cell.isFlagged && cell.isMine).size();
  }

  get isGameComplete() {
    return this.numFlaggedMines >= this.numMines;
  }

  get isGameOver() {
    return _(this.grid).flatten()
  }
}

class Cell {
  game = null;
  row = null;
  col = null;
  isMine = false;
  isFlagged = false;
  isSelected = false;

  constructor(game, row, col, isMine) {
    this.game = game;
    this.row = row;
    this.col = col;
  }

  get neighbors() {
    const {row, col} = this;
    const grid = this.game.grid;
    const neighbors = new Set();

    // top
    if (row > 0)
      neighbors.add(grid[row-1][col]);
    // bottom
    if (row < grid.length-1)
      neighbors.add(grid[row+1][col]);
    // left
    if (col > 0)
      neighbors.add(grid[row][col-1]);
    // right
    if (col < grid[0].length-1)
      neighbors.add(grid[row][col+1]);

    // top-left
    if (row > 0 && col > 0)
      neighbors.add(grid[row-1][col-1]);
    // top-right
    if (row > 0 && col < grid[0].length-1)
      neighbors.add(grid[row-1][col+1]);
    // bottom-left
    if (row < grid.length-1 && col > 0)
      neighbors.add(grid[row+1][col-1])
    // bottom-right
    if (row < grid.length-1 && col < grid[0].length-1)
      neighbors.add(grid[row+1][col+1])

    return neighbors;
  }

  get neighboringMines() {
    return this.neighbors.filter(cell => cell.isMine);
  }

  get neighboringMineCount() {
    return this.neighboringMines.length;
  }
}