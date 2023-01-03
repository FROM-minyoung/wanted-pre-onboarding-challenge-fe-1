import { todoStore } from "./../store/todo.store";
import api from "./../api/customAxios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function WriteToDo() {
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
    <div>
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        placeholder="제목"
      />
      <textarea value={content} onChange={handleContent} placeholder="내용" />
      <button onClick={todoSubmit}>추가</button>
    </div>
  );
}
