import React, { useEffect, useState } from "react";
import api from "../api/customAxios";
import { useNavigate } from "react-router-dom";
import { Todo } from "../type/todo.type";
import { useQuery } from "@tanstack/react-query";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
      refetchOnWindowFocus: "always",
    }
  );

  useEffect(() => {
    refetch();
  }, [todos, refetch]);

  const changeState = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/todolist/${e.currentTarget?.id}`);
  };

  return (
    <div className="pl-5 py-5 text-center">
      <div className="mb-3">할 일</div>
      {todos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            id={todo.id}
            onClick={changeState}
            className="flex justify-between hover:underline mb-3"
          >
            {todo.title.length >= 15
              ? `${todo.title.slice(0, 14)}...`
              : todo.title}
          </div>
        );
      })}
    </div>
  );
}
