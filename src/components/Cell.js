import "./Cell.css";

const Cell = ({
  Cellkey,
  value,
  row,
  col,
  revealed,
  flaged,
  onCellClickHandler,
  onCellContextHandler,
}) => {
  let cellValue = <div></div>;

  if (revealed && value !== 0) {
    if (value !== -1) {
      // != bomb
      cellValue = <p>{value}</p>;
    } else {
      cellValue = (
        <span>💣</span>
      );
    }
  } else if (flaged) {
    cellValue = (
      <span>🚩</span>
    );
  }

  return (
    <div
      className={`cell ${revealed ? 'revealed' : ''} ${revealed && value === -1 ? 'exploded' : ''}`}
      key={`cell-${row}-${col}`}
      onClick={onCellClickHandler(row, col)}
      onContextMenu={onCellContextHandler(row, col)}
    >
      {cellValue}
    </div>
  );
};

export default Cell;
