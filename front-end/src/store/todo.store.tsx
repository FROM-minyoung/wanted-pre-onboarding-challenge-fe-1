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
