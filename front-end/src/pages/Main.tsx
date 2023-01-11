import Login from "../components/Login";
import TodoLayout from "./../components/TodoLayout";
import { screenStyle } from "./../styles/style";
import { loginStore } from "./../store/todo.store";

export default function Main() {
  const { login } = loginStore();
  return (
    <div>
      {login ? (
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
