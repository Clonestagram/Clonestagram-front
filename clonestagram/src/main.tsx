import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./styles/styles.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ← 회원가입도 여기에 추가 가능

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<App />} /> {/* App 내부에서 나머지 경로 라우팅 */}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
