import React from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import TodoList from "./pages/TodoList";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
