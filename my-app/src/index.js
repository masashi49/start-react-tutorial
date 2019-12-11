import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

class Square extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     value: this.props.value
    //   };
    // }

    render() {
        console.log(this.props);
        return (
            <div>
                <button
                    className="square"
                    onClick={() => {
                        this.props.onClickaaaa(new Date()); //引数で親に渡す
                    }}
                >
                    {this.props.value}
                </button>
            </div>
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
        return (
            <Square
                value={this.state.squares[i]}
                onClickaaaa={day => {
                    // ここの()で子から受け取った内容を取れる
                    this.handleClick(day);
                }}
            />
        );
    }

    handleClick(i) {
        const url = "https://qiita.com/api/v2/items";
        axios.get(url).then(res => {
            const items = res.data;
            for (const item of items) {
                console.log(`${item.user.id}: \t${item.title}`);
            }
        }).catch(error => {
            const {
                status,
                statusText
            } = error.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        });

    }

    render() {
        const status = "Next player: X";

        return (
            <div>
                <p style={{color: this.state.color}}>{this.props.text}</p>
                {this.state.color}

                <button
                    onClick={() => {
                        this.setState({color: "blue"});
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
                    <Board text={"こんにちわ"}/>
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

ReactDOM.render(<Game/>, document.getElementById("root"));
