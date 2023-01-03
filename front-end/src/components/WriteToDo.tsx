import { useState } from "react";
import { todoStore } from "./../store/todo.store";

export default function WriteToDo() {
  //   const [title, setTitle] = useState<string | undefined>("");
  //   const [content, setContent] = useState<string | undefined>("");
  const { title, setTitle, content, setContent } = todoStore();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget?.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget?.value);
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
    </div>
  );
}
