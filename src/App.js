import React from 'react';
import { observer } from "mobx-react"

import NewGameScreen from './components/NewGameScreen';
import GameScreen from './components/GameScreen';
import { MineSweeperGame } from './stores/MineSweeperGame';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new MineSweeperGame(2, 5, 5),
    };
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
