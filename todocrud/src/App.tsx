import "./App.css";
import CreateTodo from "./pages/CreateTodo";
import SingleTodo from "./pages/SingleTodo";
import Todos from "./pages/Todos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-screen bg-gray-400 flex flex-col justify-center">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/todo/:id" element={<SingleTodo />} />
            <Route path="/todo/create" element={<CreateTodo />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
