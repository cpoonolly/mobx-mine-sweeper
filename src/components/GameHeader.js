import React from 'react';
import { observer } from "mobx-react"

class GameHeader extends React.Component {
  renderFace() {
    const {game} = this.props;

    if (game.isGameWon) {
      return (<React.Fragment>&#128512;</React.Fragment>); // Grinning Face Emoji
    } else if (game.isGameLost) {
      return (<React.Fragment>&#128565;</React.Fragment>); // Dizzy Face Emoji
    } else {
      return (<React.Fragment>&#128528;</React.Fragment>); // Neutral Face Emoji
    }
  }

  render() {
    const {game} = this.props;

    return (
      <div className="game-header">
        <div className="game-header-mine-count">
          Mines: {game.numMines - game.numFlagged}
        </div>
        <div className="game-header-face">
          {this.renderFace()}
        </div>
        <div className="game-header-timer">
          Time: {game.secondsElapsed}
        </div>
      </div>
    );
  }
}

export default observer(GameHeader);