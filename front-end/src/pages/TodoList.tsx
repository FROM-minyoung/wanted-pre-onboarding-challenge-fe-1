import React, { useState } from "react";
import api from "../api/customAxios";

export default function TodoList() {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const todoSubmit = () => {
    api.post("/todos", { title, content }).then((res) => console.log(res));
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
    </div>
  );
}
