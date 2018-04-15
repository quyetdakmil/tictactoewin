import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RedColor(a, b, c)
{
	var e1 = document.getElementById(a);
	e1.classList.add("RedColor");
	var e2 = document.getElementById(b);
	e2.classList.add("RedColor");
	var e3 = document.getElementById(c);
	e3.classList.add("RedColor");
}


function calculateWinner(squares) {
	const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			lines[i].push(squares[a]);
			return lines[i];
		}
	}
	return null;
}

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			id: null,
		};
	}

	render() {
		return (
			<button id={this.props.id} className="square" onClick={() => this.props.onClick()}>
			{this.props.value}
			</button>
			);
		}
	}


	class Board extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				squares: Array(9).fill(null),
				xIsNext: true,
			};
		}

		handleClick(i) {
			const squares = this.state.squares.slice();
			if (calculateWinner(squares) || squares[i]) {
				return;
			}

			if (squares[i] == null) {
				squares[i] = this.state.xIsNext ? 'X' : 'O';
			}
			else if(squares[i] == 'X')
			{
				squares[i] = 'O';
			}
			else 
			{
				squares[i] = null;
			}
			this.setState({
				squares: squares,
				xIsNext: !this.state.xIsNext,
			});
		}

		renderSquare(i) {
			return (
			<Square
			id = {i}
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
			/>
			);
		}

		render() {
			const winner = calculateWinner(this.state.squares);
			let status;
			if (winner) {
				status = 'Winner: ' + winner[3];
				RedColor(winner[0], winner[1], winner[2]);
			} else {
				status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
			}
			return (
			<div>
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
			<Board />
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

ReactDOM.render(
	<Game />,
	document.getElementById('root')
	);
