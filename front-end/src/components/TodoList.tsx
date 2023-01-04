import React, { useEffect, useState } from "react";
import api from "../api/customAxios";
import { useNavigate } from "react-router-dom";
import { Todo } from "../type/todo.type";
import { todoStore } from "../store/todo.store";
import WriteToDo from "./WriteToDo";
import { useQuery } from "@tanstack/react-query";

export default function TodoList({ writeState }: { writeState: boolean }) {
  const { title, setTitle, content, setContent } = todoStore();

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
  }, [todos, token, refetch]);

  const changeState = (e: React.MouseEvent<HTMLLIElement>) => {
    navigate(`/todolist/${e.currentTarget?.id}`);
  };

  return (
    <div className="w-[250px] px-5 py-5 text-center">
      <div hidden={writeState}>
        <WriteToDo />
      </div>
      <div className="mb-3">할 일</div>
      <ul>
        {todos.map((todo: Todo) => {
          return (
            <li
              key={todo.id}
              id={todo.id}
              onClick={changeState}
              className="flex justify-between hover:underline mb-3"
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
