import create from "zustand";

// login store
// interface loginState {
//   login: boolean;
//   setLogin: (login: boolean) => void;
// }

// export const loginStore = create<loginState>((set) => ({
//   login: false,
//   setLogin: (login) =>
//     set({
//       login,
//     }),
// }));

// todo store
interface TodoState {
  title?: string | undefined;
  editTitie?: string;
  content?: string | undefined;
  editContent?: string;
  setTitle: (userTitle: string | undefined) => void;
  setEditTitle: (editTitie: string | undefined) => void;
  setContent: (userContent: string | undefined) => void;
  setEditContent: (editContent: string | undefined) => void;
}

export const todoStore = create<TodoState>((set) => ({
  title: "",
  content: "",
  editTitie: "",
  editContent: "",
  setTitle: (userTitle) =>
    set({
      title: userTitle,
    }),
  setEditTitle: (editTitie) =>
    set({
      editTitie,
    }),
  setContent: (userContent) =>
    set({
      content: userContent,
    }),
  setEditContent: (editContent) =>
    set({
      editContent,
    }),
}));
