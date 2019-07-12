import React from 'react';
import { observer } from "mobx-react"

import { MineSweeperGame } from '../stores/MineSweeperGame';

class NewGameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numMines: 2,
      numRows: 5,
      numCols: 5,
    };
  }

  isGameParamsValid() {
    const {numMines, numRows, numCols} = this.state;

    return numMines < numRows * numCols
      && numMines > 0
      && numRows > 0
      && numCols > 0;
  }

  handleNumMinesChange(numMines) {
    this.setState({numMines});
  }

  handleNumRowsChange(numRows) {
    this.setState({numRows});
  }

  handleNumColsChange(numCols) {
    this.setState({numCols});
  }

  handleNewGameBtnClick() {
    const {numMines, numRows, numCols} = this.state;

    if (!this.isGameParamsValid()) return;

    this.props.onNewGame(new MineSweeperGame(numMines, numRows, numCols));
  }

  render() {
    return (
      <div className="new-game-screen">
        <div className="new-game-input">
          <label>Number of Mines:</label>
          <input type="number" value={this.state.numMines} onChange={(e) => this.handleNumMinesChange(e.target.value)}></input>
        </div>

        <div className="new-game-input">
          <label>Number of Rows:</label>
          <input type="number" value={this.state.numRows} onChange={(e) => this.handleNumRowsChange(e.target.value)}></input>
        </div>

        <div className="new-game-input">
          <label>Number of Cols:</label>
          <input type="number" value={this.state.numCols} onChange={(e) => this.handleNumColsChange(e.target.value)}></input>
        </div>

        <div className="new-game-btn">
          <button onClick={() => this.handleNewGameBtnClick()} disabled={!this.isGameParamsValid()}>New Game</button>
        </div>
      </div>
    );
  }
}

export default observer(NewGameScreen);