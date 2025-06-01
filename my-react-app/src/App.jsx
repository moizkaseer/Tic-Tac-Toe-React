import React, { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square1 ${isWinning ? 'winning' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('Next player: X');
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [gameMode, setGameMode] = useState('vsPlayer'); // 'vsPlayer' or 'vsComputer'
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' });
  const [showSettings, setShowSettings] = useState(false);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setGameStatus(`Winner: ${playerNames[winner]}!`);
      setScore(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    } else if (nextSquares.every(square => square)) {
      setGameStatus('Game Draw!');
    } else {
      setGameStatus(`Next player: ${playerNames[!xIsNext ? 'X' : 'O']}`);
    }

    // Computer's turn in vsComputer mode
    if (gameMode === 'vsComputer' && !xIsNext && !winner) {
      setTimeout(() => {
        const computerMove = getComputerMove(nextSquares);
        if (computerMove !== null) {
          handleClick(computerMove);
        }
      }, 500);
    }
  }

  function getComputerMove(squares) {
    const emptySquares = squares
      .map((square, index) => square === null ? index : null)
      .filter(square => square !== null);
    
    if (emptySquares.length === 0) return null;
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('Next player: X');
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
  }

  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  function handlePlayerNameChange(player, name) {
    setPlayerNames(prev => ({
      ...prev,
      [player]: name
    }));
  }

  function handleGameModeChange(mode) {
    setGameMode(mode);
    resetGame();
  }

  const winner = calculateWinner(squares);
  const winningLine = winner ? getWinningLine(squares) : null;

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <div className="game-controls">
        <button className="control-button" onClick={toggleSettings}>
          Settings
        </button>
        <button className="control-button" onClick={resetGame}>
          New Game
        </button>
        <button className="control-button" onClick={resetScore}>
          Reset Score
        </button>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-group">
            <label>Game Mode:</label>
            <select 
              value={gameMode} 
              onChange={(e) => handleGameModeChange(e.target.value)}
            >
              <option value="vsPlayer">Player vs Player</option>
              <option value="vsComputer">Player vs Computer</option>
            </select>
          </div>
          <div className="settings-group">
            <label>Player X Name:</label>
            <input
              type="text"
              value={playerNames.X}
              onChange={(e) => handlePlayerNameChange('X', e.target.value)}
            />
          </div>
          <div className="settings-group">
            <label>Player O Name:</label>
            <input
              type="text"
              value={playerNames.O}
              onChange={(e) => handlePlayerNameChange('O', e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="scoreboard">
        <div className="score-item">
          <span className="player-name">{playerNames.X}</span>
          <span className="score">{score.X}</span>
        </div>
        <div className="score-item">
          <span className="player-name">{playerNames.O}</span>
          <span className="score">{score.O}</span>
        </div>
      </div>

      <div className="status">{gameStatus}</div>

      <div className="board">
        <div className="borad-row">
          <Square 
            value={squares[0]} 
            onSquareClick={() => handleClick(0)}
            isWinning={winningLine?.includes(0)}
          />
          <Square 
            value={squares[1]} 
            onSquareClick={() => handleClick(1)}
            isWinning={winningLine?.includes(1)}
          />
          <Square 
            value={squares[2]} 
            onSquareClick={() => handleClick(2)}
            isWinning={winningLine?.includes(2)}
          />
        </div>
        <div className="borad-row">
          <Square 
            value={squares[3]} 
            onSquareClick={() => handleClick(3)}
            isWinning={winningLine?.includes(3)}
          />
          <Square 
            value={squares[4]} 
            onSquareClick={() => handleClick(4)}
            isWinning={winningLine?.includes(4)}
          />
          <Square 
            value={squares[5]} 
            onSquareClick={() => handleClick(5)}
            isWinning={winningLine?.includes(5)}
          />
        </div>
        <div className="borad-row">
          <Square 
            value={squares[6]} 
            onSquareClick={() => handleClick(6)}
            isWinning={winningLine?.includes(6)}
          />
          <Square 
            value={squares[7]} 
            onSquareClick={() => handleClick(7)}
            isWinning={winningLine?.includes(7)}
          />
          <Square 
            value={squares[8]} 
            onSquareClick={() => handleClick(8)}
            isWinning={winningLine?.includes(8)}
          />
        </div>
      </div>
    </div>
  );
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
      return squares[a];
    }
  }
  return null;
}

function getWinningLine(squares) {
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
      return lines[i];
    }
  }
  return null;
}
