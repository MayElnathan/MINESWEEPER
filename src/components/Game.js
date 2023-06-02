import Board from "./Board";
import { useEffect, useState } from "react";
import React from "react";
import "./Game.css";

const easyInfo = {
  rowNum: 9,
  colNum: 9,
  bombsNum: 10,
};

const mediumInfo = {
  rowNum: 16,
  colNum: 16,
  bombsNum: 40,
};

const hardInfo = {
  rowNum: 16,
  colNum: 30,
  bombsNum: 99,
};

const Game = () => {
  const [level, setLevel] = useState("easy");
  const [sizeInfo, setSizeInfo] = useState(easyInfo);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [bombsLeft, setBombsLeft] = useState(10);
  const [start, setStart] = useState(false);
  const [win, setWin] = useState(false);
  const [tryAgain, setTryAgain] = useState(true);

  const changedHandler = (event) => {
    setLevel(event.target.value);
  };

  const updateGameOver = () => {
    setGameOver(true);
    console.log("gameeeee overrrrr!!!");
    setStart(false);
    setTryAgain(false);
  };

  const newGameHandler = () => {
    setGameOver(false);
    setStart(false);
    setTime(0);
    setWin(false);
    setTryAgain(true);
    setBombsLeft(sizeInfo.bombsNum);
  };

  const flagHandler = (flaged) => {
    if (flaged) {
      setBombsLeft((prev) => prev - 1);
    } else {
      setBombsLeft((prev) => prev + 1);
    }
  };

  const startHandler = () => {
    setTime(0);
    setStart(true);
  };

  const winHandler = () => {
    setWin(true);
    setTryAgain(false);
  };

  useEffect(() => {
    if (level === "easy") {
      setSizeInfo(easyInfo);
      setBombsLeft(10);
    } else if (level === "medium") {
      setSizeInfo(mediumInfo);
      setBombsLeft(40);
    } else {
      setSizeInfo(hardInfo);
      setBombsLeft(99);
    }

    setGameOver(false);
    setTryAgain(true);
    setTime(0);
    setStart(false);

    console.log(sizeInfo);
  }, [level]);

  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [time, gameOver, start]);

  return (
    <React.Fragment>
      <h1>MINESWEEPER</h1>
      <div className="controler">
        <div className="bombs">{`Mines: ${bombsLeft}`}</div>
        <label>
          Level:
          <select value={level} onChange={changedHandler}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <div className="time">{`Time: ${time}`}</div>
      </div>
      {gameOver ? (
        <div className="overlay">
          <div className="gameOverMessage">Game Over</div>
          <div>
            <button onClick={newGameHandler}>Try again</button>
          </div>
        </div>
      ) : null}

      {win ? (
        <div className="overlay">
          <div className="WinMessage">You Win!</div>
          <div>
            <button onClick={newGameHandler}>Try again</button>
          </div>
        </div>
      ) : null}

      <Board
        rowNum={sizeInfo.rowNum}
        colNum={sizeInfo.colNum}
        bombsNum={sizeInfo.bombsNum}
        updateGameOver={updateGameOver}
        tryAgain={tryAgain}
        flagHandler={flagHandler}
        startHandler={startHandler}
        start={start}
        winHandler={winHandler}
      />
    </React.Fragment>
  );
};

export default Game;
