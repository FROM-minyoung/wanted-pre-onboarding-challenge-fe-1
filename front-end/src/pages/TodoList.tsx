import React, { useEffect, useState } from "react";
import api from "../api/customAxios";
import { Link, useNavigate } from "react-router-dom";
import { Todo } from "../type/todo.type";
import TodoDetail from "./../components/TodoDetail";

/*


*/
export default function TodoList() {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [todos, setTodos] = useState<Todo[]>([]);
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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

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
      .then(({ data }) => {});
  };

  return (
    <div>
      <div>TodoList</div>
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        placeholder="제목"
      />
      <textarea value={content} onChange={handleContent} placeholder="내용" />
      <button onClick={todoSubmit}>추가</button>
      <button>삭제</button>
      {todos.map((todo: Todo) => {
        return (
          <div key={todo.id}>
            {todo.title}
            <TodoDetail todoId={todo.id} />
          </div>
        );
      })}
    </div>
  );
}
