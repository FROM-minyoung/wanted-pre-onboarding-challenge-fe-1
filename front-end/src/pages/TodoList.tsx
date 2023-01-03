import React, { useEffect, useState } from "react";
import api from "../api/customAxios";
import { useNavigate } from "react-router-dom";
import { Todo } from "../type/todo.type";
import TodoDetail from "./../components/TodoDetail";
import { todoStore } from "./../store/todo.store";
import WriteToDo from "../components/WriteToDo";

export default function TodoList() {
  const { title, setTitle, content, setContent } = todoStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [detailState, setDetailState] = useState(false);
  const [writeState, setWriteState] = useState(false);

  const token = localStorage.getItem("key");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/todos", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(({ data }) => setTodos(data.data));
  }, []);

  // const movedTodoDetail = (todoId: string) => {
  //   <TodoDetail todoId={todoId} />;
  // };
  const todoSubmit = () => {
    api
      .post(
        "/todos",
        { title, content },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(() => {
        setTitle("");
        setContent("");
      });
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("key");
    navigate("/");
  };

  const changeState = (e: React.MouseEvent<HTMLInputElement>) => {
    setDetailState(!detailState);
  };

  return (
    <div className="max-w-screen-lg mt-52 m-auto">
      <div className="h-[700px] border border-solid border-gray-700">
        <div>
          <div>TodoList</div>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => setWriteState(!writeState)}>글쓰기</button>
          <div hidden={writeState}>
            <WriteToDo />
          </div>
          <button onClick={todoSubmit}>추가</button>
          <button>삭제</button>
          {todos.map((todo: Todo) => {
            return (
              <div key={todo.id}>
                <div id={todo.id} onClick={changeState}>
                  {todo.title}
                </div>
                <div id={todo.id} hidden={detailState}>
                  <TodoDetail todoId={todo.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
