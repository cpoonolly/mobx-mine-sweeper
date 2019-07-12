import React from 'react';
import { when } from 'mobx';
import { observer } from "mobx-react"

import NewGameScreen from './components/NewGameScreen';
import GameScreen from './components/GameScreen';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
    };

    when(
      () => this.state.game !== null && this.state.game.isGameLost,
      () => alert('Game Over!')
    );

    when(
      () => this.state.game !== null && this.state.game.isGameWon,
      () => alert('You Win!')
    );
  }

  handleNewGame(game) {
    this.setState({game});
  }

  render() {
    return (
      <div className="App">
        {this.state.game === null && (<NewGameScreen onNewGame={(game) => this.handleNewGame(game)}/>)}
        {this.state.game !== null && (<GameScreen game={this.state.game}/>)}
      </div>
    );
  }
}

export default observer(App);
