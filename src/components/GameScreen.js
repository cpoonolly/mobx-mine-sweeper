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
      </div>
    );
  }
}

export default observer(GameScreen);