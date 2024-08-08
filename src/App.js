import React, { useState, useEffect } from "react";
import "./App.css";
import Add from "./Components/Add/Add.jsx";
import List from "./Components/List/List.jsx";
import ChangeStatus from "./Components/ChangeStatus/ChangeStatus.jsx";

function App() {
  const allStatus = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  };

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const changeStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>#todo</h1>
      <ChangeStatus filter={filter} setFilter={setFilter} />
      <Add addTodo={addTodo} />
      <List
        todos={todos.filter(allStatus[filter])}
        changeStatus={changeStatus}
        deleteTodo={deleteTodo}
      />
      <button className="deleteAll" onClick={deleteAllTodos}>
        Delete All
      </button>
    </div>
  );
}

export default App;
