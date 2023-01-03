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

  const [todoId, setTodoId] = useState("");
  const [detailState, setDetailState] = useState(false);
  const [writeState, setWriteState] = useState(true);

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

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("key");
    navigate("/");
  };

  // 삭제

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = window.confirm(
      "삭제하시겠습니까? \n삭제한 할일은 복구할 수 없습니다."
    );
    if (answer) {
      api
        .delete(`/todos/${e.currentTarget.id}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => alert("삭제되었습니다."));
    }
  };

  const changeState = (e: React.MouseEvent<HTMLInputElement>) => {
    setTodoId(e.currentTarget.id);
    setDetailState(!detailState);
  };
  console.log(todoId);

  return (
    <div className="max-w-screen-lg">
      <div className="flex justify-center">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="w-[1024px] h-[700px] flex border border-solid border-gray-700">
        <div className="w-[300px]">
          <button onClick={() => setWriteState(!writeState)}>글쓰기</button>
          <div hidden={writeState}>
            <WriteToDo />
          </div>
          {todos.map((todo: Todo) => {
            return (
              <div key={todo.id}>
                <div id={todo.id} onClick={changeState}>
                  {todo.title}
                </div>
                <button id={todo.id} onClick={deleteTodo}>
                  삭제
                </button>

                {/* <div id={todo.id} hidden={detailState}>
                  <TodoDetail todoId={todoId} />
                </div> */}
              </div>
            );
          })}
        </div>
        {todoId && (
          <div className="flex-auto">
            <TodoDetail todoId={todoId} />
          </div>
        )}
      </div>
    </div>
  );
}
