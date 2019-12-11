import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

function Square(props) {
  return (
    <div>
      <button
        className="square"
        onClick={() => {
          props.onClickaaaa(); //引数で親に渡す
        }}
      >
        {props.value}
      </button>
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      squares: Array(9).fill(null), // fillは要素を固定値で設定
      xIsNest: true
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClickaaaa={() => {
          // ここの()で子から受け取った内容を取れる
          this.handleClick(i);
        }}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares; //配列全体を切り出して新しく配列を生成
    squares[i] = this.state.xIsNest ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNest: !this.state.xIsNest
    }); //配列全体を新しいstateとして設置
  }

  axiosStart(i) {
    const url = "https://qiita.com/api/v2/items";
    axios
      .get(url)
      .then(res => {
        const items = res.data;
        for (const item of items) {
          console.log(`${item.user.id}: \t${item.title}`);
        }
      })
      .catch(error => {
        const { status, statusText } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
      });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
      
      console.log(winner);
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
