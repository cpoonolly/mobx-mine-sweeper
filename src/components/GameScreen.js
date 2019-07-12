import React from 'react';
import { observer } from "mobx-react"

import GameHeader from './GameHeader';
import GameGrid from './GameGrid';

class GameScreen extends React.Component {
  render() {
    return (
      <div className="game-screen">
        <GameHeader game={this.props.game}/>
        <GameGrid game={this.props.game}/>

        <div className="game-screen-rules">
          <p>
            <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)">How To Play</a><br/>
            <br/>
            Controls:<br/>
            Left-Click select a square<br/>
            Right-Click flag a square as a mine<br/>
            <br/>
            Game is only over when all squares have been either selected or flagged
          </p>
        </div>
      </div>
    );
  }
}

export default observer(GameScreen);