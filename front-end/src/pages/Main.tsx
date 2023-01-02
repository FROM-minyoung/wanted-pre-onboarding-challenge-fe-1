import { Link } from "react-router-dom";
import Login from "../components/Login";
import TodoList from "./TodoList";

export default function Main() {
  return (
    <div>
      <div>main</div>
      {!localStorage.getItem("key") ? <Login /> : <TodoList />}
    </div>
  );
}
