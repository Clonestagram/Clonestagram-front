import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./styles/styles.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ← 회원가입도 여기에 추가 가능
import { AppStateProvider } from "./context/AppStateContext"; // ✅ 추가
import { RecoilRoot } from 'recoil';
import ProtectedRoute from "./components/ProtectedRoute";
import AppInitializer from "./AppInitializer";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
console.log("🔥 Root Element:", rootElement); // null이면 에러!
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <AppStateProvider> 
        <AppInitializer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           {/* 로그인 필요 */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
        </Routes>
          </AppInitializer>
        </AppStateProvider> 
      </QueryClientProvider>
    </BrowserRouter>
    </RecoilRoot>
  // </React.StrictMode>
);
