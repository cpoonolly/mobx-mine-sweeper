import React from 'react';
import { observer } from "mobx-react"

class GameGrid extends React.Component {

  handleCellClick(cell) {
    if (!this.props.game.isGameInProgress) return;
    cell.select();
  }

  handleCellRightClick(cell) {
    const {game} = this.props;

    if (!game.isGameInProgress || game.numFlagged >= game.numMines) return;
    cell.flag();
  }

  renderCell(cell) {
    const {game} = this.props;
    let cellClasses = ['game-grid-cell'];
    let cellContents = (<>&nbsp;</>);

    if (cell.isSelected) {
      cellClasses.push('selected');
    }

    if (cell.isMine && (cell.isSelected || game.isGameLost)) {
      cellClasses.push('bomb');
      cellContents = (<>&#128163;</>); // Bomb Emoji
    } else if (cell.isFlagged) {
      cellClasses.push('flagged');
      cellContents = (<>&#128205;</>); // Pin Emoji
    } else if (cell.isSelected && cell.neighboringMineCount > 0) {
      cellClasses.push(`has-${cell.neighboringMineCount}-neighbors`);
      cellContents = (<>{cell.neighboringMineCount}</>);
    }

    return (
      <div 
        className={cellClasses.join(' ')}
        key={cell.col}
        onClick={() => this.handleCellClick(cell)}
        onContextMenu={() => this.handleCellRightClick(cell)}
      >
        {cellContents}
      </div>
    );
  }

  renderRow(row, rowNum) {
    return (
      <div className="game-grid-row" key={rowNum}>
        {row.map(cell => this.renderCell(cell))}
      </div>
    );
  }

  render() {
    const {game} = this.props;

    return (
      <div className="game-grid">
        {game.grid.map((row, rowNum) => this.renderRow(row, rowNum))}
      </div>
    );
  }
}

export default observer(GameGrid);