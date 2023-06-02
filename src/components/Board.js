import { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { revealAllNeigbhours, revealAllBombs } from "../utils/index";

const bombVal = -1;
const none = 0;

const createBoared = ({ rowNum, colNum, bombsNum }) => {
  console.log(rowNum);

  let board = [];
  let bombsArray = [];

  // init all cells in boared
  for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
    let subCol = [];
    for (let colIndex = 0; colIndex < colNum; colIndex++) {
      subCol.push({
        value: none,
        row: rowIndex,
        col: colIndex,
        revealed: false,
        flaged: false,
      });
    }
    board.push(subCol);
  }

  // insert the bombs to the boared and save their location in an array
  let bombsCount = 0;
  while (bombsNum - bombsCount > 0) {
    const rowBomb = Math.floor(Math.random(rowNum) * rowNum);
    const colBomb = Math.floor(Math.random(colNum) * colNum);


    if (board[rowBomb][colBomb].value !== bombVal) {
      board[rowBomb][colBomb].value = bombVal;
      bombsCount++;
      bombsArray.push({ rowBomb, colBomb });
    }
  }

  console.log(bombsArray);

  // update the value of all the other cells according to the bombs on the board
  for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
    for (let colIndex = 0; colIndex < colNum; colIndex++) {
      if (board[rowIndex][colIndex].value === bombVal) {
        continue;
      }

      let cellValue = 0;

      // top left
      if (
        rowIndex > 0 &&
        colIndex > 0 &&
        board[rowIndex - 1][colIndex - 1].value === bombVal
      ) {
        cellValue++;
      }

      // top
      if (rowIndex > 0 && board[rowIndex - 1][colIndex].value === bombVal) {
        cellValue++;
      }

      // top right
      if (
        rowIndex > 0 &&
        colIndex < colNum - 1 &&
        board[rowIndex - 1][colIndex + 1].value === bombVal
      ) {
        cellValue++;
      }

      // right
      if (
        colIndex < colNum - 1 &&
        board[rowIndex][colIndex + 1].value === bombVal
      ) {
        cellValue++;
      }

      // bottom right
      if (
        rowIndex < rowNum - 1 &&
        colIndex < colNum - 1 &&
        board[rowIndex + 1][colIndex + 1].value === bombVal
      ) {
        cellValue++;
      }

      // bottom
      if (
        rowIndex < rowNum - 1 &&
        board[rowIndex + 1][colIndex].value === bombVal
      ) {
        cellValue++;
      }

      // bottom left
      if (
        rowIndex < rowNum - 1 &&
        colIndex > 0 &&
        board[rowIndex + 1][colIndex - 1].value === bombVal
      ) {
        cellValue++;
      }

      // left
      if (colIndex > 0 && board[rowIndex][colIndex - 1].value === bombVal) {
        cellValue++;
      }

      board[rowIndex][colIndex].value = cellValue;
    }
  }

  console.log(bombsArray);

  return { board, bombsArray };
};

const Board = ({
  rowNum,
  colNum,
  bombsNum,
  updateGameOver,
  tryAgain,
  flagHandler,
  startHandler,
  start,
  winHandler,
}) => {
  const [board, setBoard] = useState([]);
  const [bombsArray, setBombsArray] = useState([]);
  const [gameOver, setGameOver] = useState(true);
  const [boardSize, setBoardSize] = useState({ rowNum, colNum, bombsNum });
  const [remainToReveal, setRemainToReveal] = useState(
    rowNum * colNum - bombsNum
  );

  const initNewGame = () => {
    const newBoared = createBoared({ rowNum, colNum, bombsNum });
    setBoard(newBoared.board);
    setBombsArray(newBoared.bombsArray);

    setGameOver(false);
    setRemainToReveal(rowNum * colNum - bombsNum);
  };

  if (bombsNum !== boardSize.bombsNum) {
    setBoardSize({ rowNum, colNum, bombsNum });
    initNewGame();
  }

  const onReavealHandler = () => {
    setRemainToReveal((prev) => prev - 1);
  };

  useEffect(() => {
    if (gameOver && tryAgain) {
      initNewGame();
    }
  }, [boardSize, tryAgain]);

  const onCellClickHandler = (row, col) => () => {
    let updatedBoared = board.slice();
    const cell = updatedBoared[row][col];
    if (!start) {
      startHandler();
    }
    if (!gameOver && !cell.flaged && !cell.revealed) {
      if (cell.value === 0) {
        updatedBoared = revealAllNeigbhours(
          updatedBoared,
          row,
          col,
          boardSize,
          onReavealHandler
        );
        setBoard(updatedBoared);
      } else if (cell.value == -1) {
        setGameOver(true);
        updateGameOver();
        console.log("clicked a bomb !!!!!!!!!");
        updatedBoared = revealAllBombs(board, bombsArray);
        setBoard(updatedBoared);
      } else {
        updatedBoared[row][col].revealed = true;
        setBoard(updatedBoared);
        setBoardSize({ rowNum, colNum, bombsNum });
        setRemainToReveal((prev) => prev - 1);
        console.log(`clocked - ${row} , ${col}`);
      }
    }
  };

  const onCellContextHandler = (row, col) => (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    let updatedBoared = board.slice();
    const cell = updatedBoared[row][col];
    if (!start) {
      startHandler();
    }
    if (!cell.revealed) {
      updatedBoared[row][col].flaged = !cell.flaged;
      setBoard(updatedBoared);
      flagHandler(cell.flaged);
      console.log(`flaged - ${row} , ${col}`);
    }
  };

  useEffect(() => {
    console.log(remainToReveal);
    if (remainToReveal == 0) {
      winHandler();
      setGameOver(true);
    }
  }, [remainToReveal]);

  return (
    <div className="board">
      {board.map((rowBoard, rowI) => {
        return (
          <div className={`row ${rowI}`} key={`row ${rowI}`}>
            {rowBoard.map((cellBoared, colI) => {
              return (
                <Cell
                  cellKey={`cell-${rowI}-${colI}`}
                  value={cellBoared.value}
                  row={rowI}
                  col={colI}
                  revealed={cellBoared.revealed}
                  flaged={cellBoared.flaged}
                  onCellClickHandler={onCellClickHandler}
                  onCellContextHandler={onCellContextHandler}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Board;
