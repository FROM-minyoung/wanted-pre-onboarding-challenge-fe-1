import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import TodoList from "./TodoList";
import { hoberButtonStyle, screenStyle } from "../styles/style";

type FormType = {
  component?: () => JSX.Element;
};

export default function TodoLayout({ component }: FormType) {
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까?");
    if (answer) {
      localStorage.removeItem("key");
      navigate("/");
    }
  };

  return (
    <div className="max-w-screen-lg mt-28 m-auto flex flex-col items-center">
      <div className="text-[50px] mb-5">
        <Link to={"/todolist"}>T O D O</Link>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={handleLogout} className={hoberButtonStyle}>
          로그아웃
        </button>
        <button
          onClick={() => {
            navigate("/write");
          }}
          className={hoberButtonStyle}
        >
          글쓰기
        </button>
      </div>
      <div className="w-[800px] h-[550px] flex gap-4 border border-solid border-gray-700">
        <div className="min-w-[230px] overflow-y-scroll">
          <TodoList />
        </div>
        <div className="my-5 border-r-[1px] border-black"></div>
        <div className="flex-auto">{component && component()}</div>
      </div>
    </div>
  );
}
