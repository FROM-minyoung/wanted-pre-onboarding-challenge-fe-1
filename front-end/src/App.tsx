import React from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "./pages/Main";
import TodoLayout from "./pages/TodoLayout";
import SignUp from "./pages/SignUp";
import TodoDetail from "./components/TodoDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todolist" element={<TodoLayout />} />
          <Route path="/todolist/:id" element={<TodoLayout />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
