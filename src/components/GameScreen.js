import React from 'react';
import GameHeader from './GameHeader';
import GameGrid from './GameGrid';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="game-screen">
        <GameHeader game={this.props.game}/>
        <GameGrid game={this.props.game}/>
      </div>
    );
  }
}

export default GameScreen;