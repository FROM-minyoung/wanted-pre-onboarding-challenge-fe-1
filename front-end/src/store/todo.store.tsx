import create from "zustand";

// todo store
interface TodoState {
  title?: string | undefined;
  content?: string | undefined;
  setTitle: (userTitle: string | undefined) => void;
  setContent: (userContent: string | undefined) => void;
}

export const todoStore = create<TodoState>((set) => ({
  title: "",
  content: "",
  setTitle: (userTitle) =>
    set({
      title: userTitle,
    }),
  setContent: (userContent) =>
    set({
      content: userContent,
    }),
}));
