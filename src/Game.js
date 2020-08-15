import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Board from './Board';
import SortOrder from './SortOrder';
import RestartBtn from './RestartBtn';

class Game extends React.Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  // Initial state
  initialState() {
    return {
      history: [{
        squares: Array(9).fill(null),
        move: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      sort: 'asc',
      winner: null,
      winningSquares: [],
    };
  }

  // Handle Click on a square
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const { winner, winningSquares } = this.calculateWinner(squares);
    this.setState({
      history: history.concat([{
        squares: squares,
        move: history.length,
        coord: {x: i % 3 + 1, y: Math.ceil(i/3)}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winner: winner,
      winningSquares: winningSquares,
    });
  }

  // Jump to a step in history
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  // Toggle sort
  toggleSort() {
    this.setState({
      sort: this.state.sort === 'asc' ? 'desc' : 'asc',
    });
  }

  // Check if there is a winner
  calculateWinner(squares) {
    let result = {winner: null, winningSquares: []};
    [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
      .forEach((line) => {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          result = {
            winner: squares[a],
            winningSquares: line,
          };
        }
      });
    return result;
  }

  // Is the game a draw ?
  isGameADraw(squares) {
    return squares.filter(s => s === null).length === 0 && !this.state.winner;
  }

  // Restart the game
  restartGame() {
    this.setState(this.initialState());
  }

  // ==========================================================================================

  // Render history buttons
  renderHistory(history) {
    if (this.state.sort === 'desc') {
      history.sort((step1, step2) => step2.move - step1.move);
    }

    return (
      history
        .map((step) => {
          const desc = step.move
            ? `Go to move #${step.move} (${step.coord.x},${step.coord.y})`
            : 'Go to game start';
          const variant = this.state.stepNumber === step.move ? 'secondary' : 'outline-secondary';
          return (
            <li key={step.move}>
              <Button
                variant={variant}
                className="my-1"
                disabled={this.state.stepNumber === step.move}
                size="sm"
                onClick={() => this.jumpTo(step.move)}
              >
                {desc}
              </Button>
            </li>
          );
        })
    );
  }

  // Render component
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const isDraw = this.isGameADraw(current.squares);
    let status;
    if (this.state.winner) {
      status = `Winner: ${this.state.winner}`;
    } else if (isDraw) {
      status = 'Game is a draw';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="container pt-5">
        <div className="text-center mb-5">
          <h1>Tic Tac Toe</h1>
          <hr/>
        </div>

        <Row className="justify-content-center">
          <Col xs="auto" className="mb-3">
            <Board
              squares={current.squares}
              highlights={this.state.winningSquares}
              onClick={(i) => this.handleClick(i)}
            />

            <RestartBtn
              winner={this.state.winner}
              isGameADraw={isDraw}
              onClick={() => this.restartGame()}/>
          </Col>
          <Col xs="6">
            <div className="status mb-3">
              <h3>{status}</h3>
            </div>

            <SortOrder
            sort={this.state.sort}
            toggleSort={() => this.toggleSort()}/>

            <ol className="moves">{this.renderHistory(history.slice())}</ol>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Game;