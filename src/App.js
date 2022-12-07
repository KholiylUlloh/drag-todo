import React, { useState } from "react";
import data from "./data";

function App() {
  const [boards, setBoards] = useState(data);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0px,4px,3px,gray";
    }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    board.items.map((i) => (i.status = item.status));
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  return (
    <div className="App">
      {boards.map((board) => (
        <div key={board.id} className="board">
          <div className="board_title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className="item"
            >
              <div>Title: {item.title}</div>
              <div>Descr: {item.descr}</div>
              <div>Status: {item.status}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
