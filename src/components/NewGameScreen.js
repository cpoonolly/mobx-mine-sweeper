import React from 'react';
import { observer } from "mobx-react"

import { MineSweeperGame } from '../stores/MineSweeperGame';

class NewGameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numMines: 0,
      numRows: 1,
      numCols: 1,
      game: null,
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
    this.setState({game: new MineSweeperGame(numMines, numRows, numCols)});

    this.props.onNewGame(this.state.game);
    event.preventDefault();
  }

  render() {
    return (
      <div className="new-game-screen">
        <form onSubmit={(e) => this.handleNewGameBtnClick(e)}>
          <div className="new-game-input">
            <label>
              Number of Mines:
              <input type="number" value={this.state.numMines} onChange={(e) => this.handleNumMinesChange(e.target.value)}></input>
            </label>
          </div>

          <div className="new-game-input">
            <label>
              Number of Rows:
              <input type="number" value={this.state.numRows} onChange={(e) => this.handleNumRowsChange(e.target.value)}></input>
            </label>
          </div>

          <div className="new-game-input">
            <label>
              Number of Cols:
              <input type="number" value={this.state.numCols} onChange={(e) => this.handleNumColsChange(e.target.value)}></input>
            </label>
          </div>

          <div className="new-game-input">
            <input type="submit" value="New Game"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default observer(NewGameScreen);