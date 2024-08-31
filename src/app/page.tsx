"use client";
import { useState } from "react";
import Image from "next/image";

function Square({ value, onSquareClick }: any) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}: any) {
  

  function handelClick(i: any) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="p-0 m-5">
      <div className="mb-5">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => {
            handelClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => {
            handelClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => {
            handelClick(2);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => {
            handelClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => {
            handelClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => {
            handelClick(5);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => {
            handelClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => {
            handelClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => {
            handelClick(8);
          }}
        />
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handPlay(nextSquares: any) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game flex flex-row">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handPlay}/>
      </div>
      <div className="game-info ml-3">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: any) {
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
