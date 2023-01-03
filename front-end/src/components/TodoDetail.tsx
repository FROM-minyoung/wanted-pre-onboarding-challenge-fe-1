import { useEffect, useState } from "react";
import { TodoId } from "../type/todo.type";
import api from "./../api/customAxios";
import { Todo } from "./../../../back-end/types/todos";

export default function TodoDetail({ todoId }: TodoId) {
  const token = localStorage.getItem("key");
  const [todoDetail, setTodoDetail] = useState<Todo>();

  useEffect(() => {
    api
      .get(`/todos/${todoId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(({ data }) => setTodoDetail(data.data));
  }, []);

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

  return (
    <div className="px-3 py-5">
      <section className="flex justify-between">
        <div className="text-[30px]">{todoDetail?.title}</div>

        <div className="flex items-end">
          <button className="text-sm text-gray-900 mr-3">수정</button>
          <button
            id={todoId}
            onClick={deleteTodo}
            className="text-sm text-gray-400 mr-3"
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
