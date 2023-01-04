import { useEffect, useState } from "react";
import api from "./../api/customAxios";
import { Todo } from "./../../../back-end/types/todos";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { hoberButtonStyle } from "../styles/style";
import { editStore, todoStore } from "./../store/todo.store";

export default function TodoEdit() {
  const token = localStorage.getItem("key");
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { editTitie, editContent, setEditTitle, setEditContent } = todoStore();
  const { setEditState } = editStore();

  const queryClient = useQueryClient();
  //   const todosData = queryClient.getQueryData(["TodosDetail"]);

  //   console.log(todosData);
  //   //   const setData = () => {
  //   //     setTitle(todosData?.data?.data.title);.
  //   //     setContent(todosData?.data?.data.content);
  //   //   };

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
        setEditState(false);
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
            setEditState(false);
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
