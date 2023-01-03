import { Link } from "react-router-dom";
import Login from "../components/Login";
import TodoList from "./TodoList";

export default function Main() {
  return (
    <div className="max-w-screen-lg mt-52 m-auto">
      <div className="h-[700px] border border-solid border-gray-700">
        <div>main</div>
        {!localStorage.getItem("key") ? <Login /> : <TodoList />}
      </div>
    </div>
  );
}
