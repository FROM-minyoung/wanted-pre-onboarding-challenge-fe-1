import Login from "../components/Login";
import TodoLayout from "../pages/TodoLayout";
import { screenStyle } from "./../styles/style";

export default function Main() {
  return (
    <div className={screenStyle}>
      <div>
        {!localStorage.getItem("key") ? (
          <>
            <div className="text-[50px] mb-5">T O D O</div>
            <Login />
          </>
        ) : (
          <TodoLayout />
        )}
      </div>
    </div>
  );
}
