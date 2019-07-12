import { observable, computed, decorate, action } from "mobx";

import Chance from 'chance';
import _ from 'lodash';
import moment from 'moment';

const chance = new Chance();

class MineSweeperGame {
  grid = [];
  numRows = 0;
  numCols = 0;
  timeStart = 0;
  timeCurrent = 0;
  
  constructor(numMines, numRows, numCols) {
    
    this.timeCurrent = moment();
    this.timeStart = this.timeCurrent;
    setInterval(() => this.tickTime(), 1000);

    this.numRows = numRows;
    this.numCols = numCols;
    this.grid = new Array(numRows);

    for (let row = 0; row < numRows; row++) {
      this.grid[row] = new Array(numCols);

      for (let col = 0; col < numCols; col++) {
        this.grid[row][col] = new Cell(this, row, col);
      } 
    }

    const cells = _.flatten(this.grid);
    chance.pickset(cells, numMines).forEach(cell => cell.isMine = true);
  }

  tickTime() {
    if (!this.isGameInProgress) return;

    this.timeCurrent = moment();
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

  get numSelected() {
    return _(this.grid).flatten().filter(cell => cell.isSelected).size();
  }

  get isGameWon() {
    return !this.isGameLost && this.numSelected + this.numMines === this.numRows * this.numCols && this.numFlaggedMines === this.numMines;
  }

  get isGameLost() {
    return _(this.grid).flatten().filter(cell => cell.isSelected && cell.isMine).some();
  }

  get isGameInProgress() {
    return !this.isGameWon && !this.isGameLost;
  }

  get secondsElapsed() {
    return this.timeCurrent.diff(this.timeStart, 'seconds');
  }

  toString() {
    return this.grid.map((row) => row.map(cell => cell.toString()).join('')).join('\n');
  }
}

decorate(MineSweeperGame, {
  grid: observable,
  numRows: observable,
  numCols: observable,
  timeStart: observable,
  timeCurrent: observable,

  tickTime: action,

  numMines: computed,
  numFlagged: computed,
  numFlaggedMines: computed,
  numSelected: computed,
  isGameWon: computed,
  isGameLost: computed,
  isGameInProgress: computed,
  secondsElapsed: computed,
});

class Cell {
  game = null;
  row = null;
  col = null;
  isMine = false;
  isFlagged = false;
  isSelected = false;

  constructor(game, row, col) {
    this.game = game;
    this.row = row;
    this.col = col;
  }

  flag() {
    this.isFlagged = !this.isFlagged;
  }

  select() {
    this.isSelected = true;

    if (this.isMine || this.neighboringMineCount > 0) return;

    this.neighbors
      .filter(cell => !cell.isMine && !cell.isSelected)
      .forEach(cell => cell.select());
  }

  get neighbors() {
    
    const {row, col} = this;
    const grid = this.game.grid;
    const neighbors = [];

    // top
    if (row > 0)
      neighbors.push(grid[row-1][col]);
    // bottom
    if (row < grid.length-1)
      neighbors.push(grid[row+1][col]);
    // left
    if (col > 0)
      neighbors.push(grid[row][col-1]);
    // right
    if (col < grid[0].length-1)
      neighbors.push(grid[row][col+1]);

    // top-left
    if (row > 0 && col > 0)
      neighbors.push(grid[row-1][col-1]);
    // top-right
    if (row > 0 && col < grid[0].length-1)
      neighbors.push(grid[row-1][col+1]);
    // bottom-left
    if (row < grid.length-1 && col > 0)
      neighbors.push(grid[row+1][col-1])
    // bottom-right
    if (row < grid.length-1 && col < grid[0].length-1)
      neighbors.push(grid[row+1][col+1])

    return neighbors;
  }

  get neighboringMines() {
    return this.neighbors.filter(cell => cell.isMine);
  }

  get neighboringMineCount() {
    return this.neighboringMines.length;
  }

  toString() {
    let result;

    if (this.isMine) result = 'M';
    else if (this.isFlagged) result = 'F';
    else result = `${this.neighboringMineCount}`;

    return (this.isSelected ? `[|${result}|]` : `[ ${result} ]`);
  }
}

decorate(Cell, {
  game: observable,
  row: observable,
  col: observable,
  isMine: observable,
  isFlagged: observable,
  isSelected: observable,

  select: action,
  flag: action,

  neighbors: computed,
  neighboringMines: computed,
  neighboringMineCount: computed,
});

export { MineSweeperGame, Cell };