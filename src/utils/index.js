
const bombVal = -1;

const getAllUnrevealedNeigbhours = (board, row, col , boardSize) => {
  let neigbhours = [];

  console.log(boardSize);

  // top left
  if (
    row > 0 &&
    col > 0 &&
    !board[row - 1][col - 1].revealed &&
    board[row - 1][col - 1].value !== bombVal
  ) {
    neigbhours.push(board[row - 1][col - 1]);
  }

  // top
  if (
    row > 0 &&
    !board[row - 1][col].revealed &&
    board[row - 1][col].value !== bombVal
  ) {
    neigbhours.push(board[row - 1][col]);
  }

  // top right
  if (
    row > 0 &&
    col < boardSize.colNum - 1 &&
    !board[row - 1][col + 1].revealed &&
    board[row - 1][col + 1].value !== bombVal
  ) {
    neigbhours.push(board[row - 1][col + 1]);
  }

  // right
  if (
    col < boardSize.colNum - 1 &&
    !board[row][col + 1].revealed &&
    board[row][col + 1].value !== bombVal
  ) {
    neigbhours.push(board[row][col + 1]);
  }

  // bottom right
  if (
    row < boardSize.rowNum - 1 &&
    col < boardSize.colNum - 1 &&
    !board[row + 1][col + 1].revealed &&
    board[row + 1][col + 1].value !== bombVal
  ) {
    neigbhours.push(board[row + 1][col + 1]);
  }

  // bottom
  if (
    row < boardSize.rowNum - 1 &&
    !board[row + 1][col].revealed &&
    board[row + 1][col].value !== bombVal
  ) {
    neigbhours.push(board[row + 1][col]);
  }

  // bottom left
  if (
    row < boardSize.rowNum - 1 &&
    col > 0 &&
    !board[row + 1][col - 1].revealed &&
    board[row + 1][col - 1].value !== bombVal
  ) {
    neigbhours.push(board[row + 1][col - 1]);
  }

  // left
  if (
    col > 0 &&
    !board[row][col - 1].revealed &&
    board[row][col - 1].value !== bombVal
  ) {
    neigbhours.push(board[row][col - 1]);
  }

  console.log(neigbhours);

  return neigbhours;
};

export const revealAllNeigbhours = (board, row, col , boardSize , onReavealHandler) => {
  let neigbhours = getAllUnrevealedNeigbhours(board, row, col , boardSize);
  let newBoared = board.slice();
  newBoared[row][col].revealed = true;
  onReavealHandler();
  let cell;
  let setNeigbhours;

  while (neigbhours.length) {
    cell = neigbhours.shift();
    console.log(cell);

    console.log(newBoared[cell.row][cell.col].revealed);
    newBoared[cell.row][cell.col].revealed = true;
    newBoared[cell.row][cell.col].flaged = false;
    onReavealHandler();
    if (cell.value === 0) {
      setNeigbhours = new Set([
        ...neigbhours,
        ...getAllUnrevealedNeigbhours(newBoared, cell.row, cell.col , boardSize),
      ]);
      neigbhours = Array.from(setNeigbhours);
    }
  }

  return newBoared;
};

export const revealAllBombs = (board , bombsArray) => {
    let newBoared = board.slice();
    console.log('reveling bombs...');
    console.log(bombsArray);
    bombsArray.map(bomb => {
        console.log(bomb);
        newBoared[bomb.rowBomb][bomb.colBomb].revealed = true;
        console.log(newBoared[bomb.rowBomb][bomb.colBomb].revealed);
    })

    return newBoared;
}
