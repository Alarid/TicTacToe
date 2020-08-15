import React from 'react';

import Square from './Square';
import './Board.css';

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        highlight={this.props.highlights.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let idx = 0;
    return (
      <div>
        { Array(3).fill(null).map((_, rowIdx) =>
          <div className="board-row" key={rowIdx}>
            { Array(3).fill(null).map(() => this.renderSquare(idx++)) }
          </div>)
        }
      </div>
    );
  }
}

export default Board;