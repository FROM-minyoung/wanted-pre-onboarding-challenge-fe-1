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

  return (
    <div>
      <div>{todoDetail?.createdAt}</div>
      <div>디테일 제목 : {todoDetail?.title}</div>
      <div>디테일 내용 : {todoDetail?.content}</div>
    </div>
  );
}
