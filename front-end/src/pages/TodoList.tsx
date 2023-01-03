import React, { useEffect, useState } from "react";
import api from "../api/customAxios";
import { useNavigate } from "react-router-dom";
import { Todo } from "../type/todo.type";
import TodoDetail from "./../components/TodoDetail";
import { todoStore } from "./../store/todo.store";
import WriteToDo from "../components/WriteToDo";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function TodoList() {
  const queryClient = useQueryClient();
  const { title, setTitle, content, setContent } = todoStore();
  const [todos, setTodos] = useState<Todo[]>([]);

  const [todoId, setTodoId] = useState("");
  const [writeState, setWriteState] = useState(false);

  const token = localStorage.getItem("key");
  const navigate = useNavigate();

  const { refetch } = useQuery(
    ["Todos"],
    () =>
      api.get("/todos", {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        setTodos(data.data.data);
      },
      staleTime: 60 * 1000 * 5,
    }
  );

  useEffect(() => {
    refetch();
  }, [todoId, todos, refetch]);

  // 로그아웃
  const handleLogout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까?");
    if (answer) {
      localStorage.removeItem("key");
      navigate("/");
    }
  };

  const changeState = (e: React.MouseEvent<HTMLInputElement>) => {
    setTodoId(e.currentTarget.id);
  };

  return (
    <div className="max-w-screen-lg">
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
        <div className="w-[250px] px-5 py-5 text-center">
          {writeState ? (
            <WriteToDo />
          ) : (
            <>
              <div className="mb-3">할 일</div>
              {todos.map((todo: Todo) => {
                return (
                  <div
                    key={todo.id}
                    id={todo.id}
                    onClick={changeState}
                    className="flex justify-between hover:underline cursor-pointer mb-3"
                  >
                    {todo.title}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="my-5 border-r-[1px] border-black"></div>
        {todoId && (
          <div className="flex-auto">
            <TodoDetail todoId={todoId} />
          </div>
        )}
      </div>
    </div>
  );
}
