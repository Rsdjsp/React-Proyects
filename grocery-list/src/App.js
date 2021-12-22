import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";
import nextId from "react-id-generator";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editID, seteditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "Please, enter a value", type: "danger" });
      removeAlert();
    } else if (name && editing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, text: name };
          }

          return item;
        })
      );
      setAlert({ show: true, msg: "Item edited succesfull", type: "success" });
      setEditing(false);
      seteditID(null);
      setName("");
      removeAlert();
    } else {
      setAlert({ show: true, msg: "Item added succesfull", type: "success" });
      const itemId = nextId();
      const newItem = { id: itemId, text: name };
      setList([newItem, ...list]);
      setName("");
      removeAlert();
    }
  };

  const clearAll = () => {
    if (editing) {
      setAlert({
        show: true,
        msg: "You must edit the item first",
        type: "danger",
      });
    } else {
      setAlert({ show: true, msg: "All items was deleted", type: "danger" });
      setList([]);
      localStorage.clear("list");
      removeAlert();
    }
  };

  const editItem = (id) => {
    const valueEdited = list.find((item) => item.id === id);
    setEditing(true);
    seteditID(id);
    setName(valueEdited.text);
  };
  const removeItem = (id) => {
    if (editing) {
      setAlert({
        show: true,
        msg: "You must edit the item first",
        type: "danger",
      });
    } else {
      setAlert({ show: true, msg: "Item  deleted", type: "danger" });
      setList(list.filter((item) => item.id !== id));
    }
  };

  const removeAlert = () => {
    setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 2500);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="container">
      <div className="message-container">
        <Alert alert={alert} itemList={list} itemName={name} />
      </div>
      <div className="form-container">
        <h2>grocery list</h2>
        <form className="control-form" onSubmit={handleSubmit}>
          <input
            className="txt-entry"
            maxLength="32"
            value={name}
            type="text"
            placeholder="Write Your Products"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={`${editing ? "submit2-btn" : "submit-btn"}`}
            type="submit"
          >
            {editing ? "Edit" : "Add"}
          </button>
          {editing && (
            <button
              className="cancel-btn"
              onClick={() => {
                setEditing(false);
                setName("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      {list.length > 0 && (
        <div className="list-container">
          <List
            itemList={list}
            edit={editItem}
            remove={removeItem}
            enter={handleSubmit}
            removeAlert={removeAlert}
            editing={editing}
          />
          <button className="clear-btn" onClick={clearAll}>
            clear all
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
