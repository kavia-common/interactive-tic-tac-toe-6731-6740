import React, { useState } from 'react';
import styles from '../Game.module.css';

// PUBLIC_INTERFACE
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(cell => cell)) {
      setGameOver(true);
    }
    
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell);
  
  const getStatus = () => {
    if (winner) {
      return <span className={styles.winMessage}>{`Winner: ${winner}`}</span>;
    }
    if (isDraw) {
      return <span className={styles.drawMessage}>Game Draw!</span>;
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.status}>{getStatus()}</div>
      <div className={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            className={`${styles.cell} ${value === 'X' ? styles.x : value === 'O' ? styles.o : ''}`}
            onClick={() => handleClick(index)}
            disabled={value || gameOver}
            aria-label={`Cell ${index + 1}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Game;
