import React from 'react';
import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square1" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setxIsNext] = useState(true);
  const [square, setsquare] = useState(Array(9).fill(null));

  function handleClick(i) {
    if ((square[i]) || calculateWinner(square)) {
      return; // Ignore click if square is already filled
    }
    const nextSquare = square.slice();
    if (xIsNext) {
      nextSquare[i] = 'X';
    }
    else {
      nextSquare[i] = 'O';
    }
    setsquare(nextSquare);
    setxIsNext(!xIsNext);

  }

  // Function to check for a winner
  function calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i =0 ; i < lines.length; i++) {
      const [a,b,c] =lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return the winner ('X' or 'O')
      }
    }
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="borad-row">
        <Square value={square[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={square[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={square[2]} onSquareClick={() => { handleClick(2) }} />
      </div>
      <div className="borad-row">
        <Square value={square[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={square[4]} onSquareClick={() => { handleClick(4) }} />
        <Square value={square[5]} onSquareClick={() => { handleClick(5) }} />
      </div>
      <div className="borad-row">
        <Square value={square[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={square[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={square[8]} onSquareClick={() => { handleClick(8) }} />
      </div>
    </div>
  );
}
