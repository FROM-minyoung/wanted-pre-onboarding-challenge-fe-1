import { useEffect, useState } from "react";
import api from "../api/customAxios";
import { Todo } from "../../../back-end/types/todos";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { hoberButtonStyle } from "../styles/style";
import TodoLayout from "./../components/TodoLayout";

function TodoDetail() {
  const token = localStorage.getItem("key");
  const [todoDetail, setTodoDetail] = useState<Todo>();

  const navigate = useNavigate();
  const { id } = useParams();

  const { refetch } = useQuery(
    ["TodosDetail"],
    () =>
      api.get(`/todos/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        setTodoDetail(data.data.data);
      },
      staleTime: 60 * 1000 * 5,
      retry: false,
    }
  );

  // id가 변할때마다 refetch 되게하기
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  // 삭제
  const todoDeleteMutation = useMutation(
    () =>
      api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: () => {
        alert("삭제되었습니다.");
        navigate("/");
      },
    }
  );

  const deleteTodo = () => {
    const answer = window.confirm(
      "삭제하시겠습니까? \n삭제한 할일은 복구할 수 없습니다."
    );
    if (answer) {
      todoDeleteMutation.mutate();
    }
  };

  return (
    <div className="px-3 py-5">
      <section className="flex justify-between">
        <div className="text-[30px] w-96">{todoDetail?.title}</div>

        <div className="flex items-end">
          <button
            onClick={() => {
              navigate(`/update/${id}`);
            }}
            className={`${hoberButtonStyle} text-sm text-gray-900 mr-3`}
          >
            수정
          </button>
          <button
            onClick={deleteTodo}
            className={`${hoberButtonStyle} text-sm text-gray-400 mr-3`}
          >
            삭제
          </button>
        </div>
      </section>
      <div className="text-xs">{todoDetail?.createdAt.split("T")[0]}</div>
      <div className="mt-7">{todoDetail?.content}</div>
    </div>
  );
}

export default function DetailToDoPage() {
  return <TodoLayout component={TodoDetail} />;
}
