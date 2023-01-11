import api from "../api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { hoberButtonStyle } from "../styles/style";

import TodoLayout from "../components/TodoLayout";
import { todoStore } from "../store/todo.store";

function WriteToDo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { title, setTitle, content, setContent } = todoStore();

  const token = localStorage.getItem("key");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget?.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget?.value);
  };

  const todoWriteMutation = useMutation(
    () =>
      api.post(
        "/todos",
        { title, content },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      ),
    {
      onSuccess: ({ data }) => {
        setTitle("");
        setContent("");
        navigate(`/todolist/${data.data.id}`);
        queryClient.invalidateQueries(["Todos"]);
      },
      onError: ({ response }) => {
        alert(response.data.details);
      },
    }
  );

  const todoSubmit = () => {
    todoWriteMutation.mutate();
  };

  return (
    <div className="flex flex-col">
      <section className="px-3 py-5">
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="할 일"
          className="mb-4 w-[95%] border-b-2 text-[30px]"
        />
        <textarea
          value={content}
          onChange={handleContent}
          placeholder="내용"
          className="w-[95%] h-56 none resize-none"
        />
      </section>
      <section className="flex justify-center gap-5">
        <button onClick={todoSubmit} className={hoberButtonStyle}>
          추가
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className={hoberButtonStyle}
        >
          취소
        </button>
      </section>
    </div>
  );
}

export default function WriteToDoPage() {
  return <TodoLayout component={WriteToDo} />;
}
