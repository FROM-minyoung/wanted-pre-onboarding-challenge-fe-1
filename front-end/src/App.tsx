import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "./pages/Main";
import SignUp from "./pages/SignUp";

import WriteToDoPage from "./pages/WriteToDo";
import DetailToDoPage from "./pages/TodoDetail";
import UpdateToDoPage from "./pages/EditTodo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<WriteToDoPage />} />
          <Route path="/todolist/:id" element={<DetailToDoPage />} />
          <Route path="/update/:id" element={<UpdateToDoPage />} />

          {/* <Route path="*" element={<404 페이지 넣기/>} /> */}
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
