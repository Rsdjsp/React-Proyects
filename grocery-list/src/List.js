import React from "react";
import { AiFillEdit } from "react-icons/ai"
import { GoTrashcan } from "react-icons/go";

function List({ itemList, edit, remove, removeAlert }) {
  return (
    <div className="item-list">
      {itemList.map((item) => {
        const { id, text } = item;
        return (
          <article className="list-items" key={id}>
            <p className="list-grocery">{text}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => {
                  edit(id);
                  removeAlert();
                }}
              >
                <AiFillEdit />
              </button>
              <button className="trash-btn">
                <GoTrashcan
                  onClick={() => {
                    remove(id);
                    removeAlert();
                  }}
                />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
