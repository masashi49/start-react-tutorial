import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

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

function Square(props) {
  return (
    <div>
      <button
        className="square"
        onClick={() => {
          props.onClick(); //引数で親に渡す
        }}
      >
        {props.value}
      </button>
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          // ここの()で子から受け取った内容を取れる
          this.props.onClick(i);
        }}
      />
    );
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
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //時間を巻き戻して新たな手を加えた時、巻き戻る前の未来を消す。
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([ //.concatするたびに手順が増えていく
        {
          squares: squares
        }
      ]),
      stepNumber: history.length, //現在何手目なのか
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //別コンポ−として外に出したい。
    const moves = history.map((step, move) => { //手順が増えるたびrenderされてボタンも増えていく。
      const desc = move ?
        'go to move #' + move :
        'go to game start';
      return (
        // keyはレンダリングの不可に関わるので、必ずつけよう。keyによってコンポーネントの作成、移動、破棄の適切なものが動く。
        <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}::{move}</button></li>
      )
    })

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <h1>Hello Game!!</h1>
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}:::{moves}</ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
