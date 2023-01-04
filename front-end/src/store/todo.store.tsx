import create from "zustand";

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

// write store
interface WriteState {
  writeState: boolean;
  setWriteState: (writeState: boolean) => void;
}

export const writeStore = create<WriteState>((set) => ({
  writeState: false,
  setWriteState: (writeState) =>
    set({
      writeState,
    }),
}));

// edit store
interface EditState {
  editState: boolean;
  setEditState: (editState: boolean) => void;
}

export const editStore = create<EditState>((set) => ({
  editState: false,
  setEditState: (editState) =>
    set({
      editState,
    }),
}));
