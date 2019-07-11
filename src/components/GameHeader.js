import React from 'react';

class GameHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFace() {
    const {game} = this.props;

    if (game.isGameWon) {
      return '&#128512;'; // Grinning Face Emoji
    } else if (game.isGameLost) {
      return '&#128565;'; // Dizzy Face Emoji
    } else {
      return '&#128528;'; // Neutral Face Emoji
    }
  }

  render() {
    const {game} = this.props;

    return (
      <div class="game-header">
        <div class="game-header-mine-count">
          <h4>Mine Count: {game.numMines}</h4>
        </div>
        <div class="game-header-face">
          <h4>Status: {this.renderFace()}</h4>
        </div>
        <div class="game-header-timer">
          <h4>Time: {game.secondsElapsed}</h4>
        </div>
      </div>
    );
  }
}

export default GameHeader;