import React from 'react';
import { observer } from "mobx-react"

class GameGrid extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCellClick(cell) {
    cell.select();
  }

  handleCellRightClick(cell) {
    cell.flag();
  }

  renderCell(cell) {
    const {game} = this.props;

    let cellClasses = ['game-grid-cell'];
    let cellContents = (<React.Fragment>&nbsp;</React.Fragment>);

    if (cell.isSelected) {
      cellClasses.push('selected');
    }

    if (cell.isMine && (cell.isSelected || game.isGameLost)) {
      cellClasses.push('bomb');
      cellContents = (<React.Fragment>&#128163;</React.Fragment>); // Bomb Emoji
    } else if (cell.isFlagged) {
      cellClasses.push('flagged');
      cellContents = (<React.Fragment>&#128205;</React.Fragment>); // Pin Emoji
    } else if (cell.isSelected && cell.neighboringMineCount > 0) {
      cellClasses.push(`has-${cell.neighboringMineCount}-neighbors`);
      cellContents = (<React.Fragment>{cell.neighboringMineCount}</React.Fragment>);
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