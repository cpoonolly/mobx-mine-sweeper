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

  handleNumMinesChange(numMines) {
    this.setState({numMines});
  }

  handleNumRowsChange(numRows) {
    this.setState({numRows});
  }

  handleNumColsChange(numCols) {
    this.setState({numCols});
  }

  handleNewGameBtnClick(event) {
    const {numMines, numRows, numCols} = this.state;

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
          <button onClick={() => this.handleNewGameBtnClick()}>New Game</button>
        </div>
      </div>
    );
  }
}

export default observer(NewGameScreen);