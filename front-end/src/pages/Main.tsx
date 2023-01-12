import Login from "../components/Login";
import TodoLayout from "./../components/TodoLayout";
import { screenStyle } from "./../styles/style";

export default function Main() {
  return (
    <div>
      {localStorage.getItem("key") ? (
        <TodoLayout component={undefined} />
      ) : (
        <div className={screenStyle}>
          <div className="text-[50px] mb-5">T O D O</div>
          <Login />
        </div>
      )}
    </div>
  );
}
