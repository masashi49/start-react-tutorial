import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  render() {
    console.log(this);
    return (
      <button
        className="square"
        onClick={() => {
          this.setState({
            value: "X"
          });
        }}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      squares: Array(9).fill(null) // fillは要素を固定値で設定
    };
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
  render() {
    const status = "Next player: X";

    return (
      <div>
        <p style={{ color: this.state.color }}>{this.props.text}</p>
        {this.state.color}

        <button
          onClick={() => {
            this.setState({ color: "blue" });
          }}
        >
          色変え
        </button>

        <button
          onClick={() => {
            alert(this.state.color);
          }}
        >
          alert
        </button>

        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h1>Hello Game!!</h1>
          <Board text={"こんにちわ"} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
