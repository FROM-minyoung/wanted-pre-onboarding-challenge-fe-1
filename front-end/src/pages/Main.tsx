import Login from "../components/Login";
import TodoLayout from "../pages/TodoLayout";
import { screenStyle } from "./../styles/style";

export default function Main() {
  return (
    <div className={screenStyle}>
      <div className="text-[50px] mb-5">T O D O</div>
      <div>{!localStorage.getItem("key") ? <Login /> : <TodoLayout />}</div>
    </div>
  );
}
