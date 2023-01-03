import { Link } from "react-router-dom";
import Login from "../components/Login";
import TodoList from "./TodoList";

export default function Main() {
  return (
    <div className="max-w-screen-lg mt-52 m-auto">
      <div className="flex flex-col items-center">
        <div className="text-[50px] mb-5">T O D O</div>
        <div>{!localStorage.getItem("key") ? <Login /> : <TodoList />}</div>
      </div>
    </div>
  );
}
