import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";
import { screenStyle } from "../styles/style";
import TodoList from "./../components/TodoList";

export default function TodoLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [writeState, setWriteState] = useState(false);

  // 로그아웃
  const handleLogout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까?");
    if (answer) {
      localStorage.removeItem("key");
      navigate("/");
    }
  };

  return (
    <div className={screenStyle}>
      <div className="text-[50px] mb-5">
        <Link to={"/todolist"}>T O D O</Link>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={handleLogout} className="hover:underline">
          로그아웃
        </button>
        <button
          onClick={() => setWriteState(!writeState)}
          className="hover:underline"
        >
          글쓰기
        </button>
      </div>
      <div className="w-[800px] h-[500px] flex gap-4 border border-solid border-gray-700">
        <TodoList writeState={writeState} />
        <div className="my-5 border-r-[1px] border-black"></div>
        <div className="flex-auto">{id ? <TodoDetail /> : null}</div>
      </div>
    </div>
  );
}
