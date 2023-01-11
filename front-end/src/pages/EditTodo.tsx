import { useEffect } from "react";
import api from "../api/customAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { hoberButtonStyle } from "../styles/style";
import { todoStore } from "../store/todo.store";
import TodoLayout from "./../components/TodoLayout";

function UpdateTodo() {
  const token = localStorage.getItem("key");
  const navigate = useNavigate();
  const { id } = useParams();
  const { editTitie, editContent, setEditTitle, setEditContent } = todoStore();

  const queryClient = useQueryClient();

  const { refetch } = useQuery(
    ["userTodo"],
    () =>
      api.get(`/todos/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        setEditTitle(data.data.data.title);
        setEditContent(data.data.data.content);
      },
      staleTime: 60 * 1000 * 5,
    }
  );

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.currentTarget?.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.currentTarget?.value);
  };

  const todoEditMutation = useMutation(
    () =>
      api.put(
        `/todos/${id}`,
        { title: editTitie, content: editContent },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      ),
    {
      onSuccess: ({ data }) => {
        navigate(`/todolist/${data.data.id}`);
        queryClient.invalidateQueries(["Todos"]);
      },
      onError: ({ response }) => {
        alert(response.data.details);
      },
    }
  );

  const todoEdit = () => {
    todoEditMutation.mutate();
  };

  return (
    <div className="px-3 py-5">
      <section className="">
        <input
          type="text"
          value={editTitie}
          onChange={handleTitle}
          placeholder="할 일"
          className="mb-4 w-[95%] border-b-2 text-[30px] leading-none items-center"
        />
        <textarea
          value={editContent}
          onChange={handleContent}
          placeholder="내용"
          className="w-[95%] h-56 none resize-none"
        />
      </section>
      <section className="flex justify-center gap-5">
        <button onClick={todoEdit} className={hoberButtonStyle}>
          수정
        </button>
        <button
          onClick={() => {
            navigate(`/todolist/${id}`);
          }}
          className={hoberButtonStyle}
        >
          취소
        </button>
      </section>
    </div>
  );
}

export default function UpdateToDoPage() {
  return <TodoLayout component={UpdateTodo} />;
}
