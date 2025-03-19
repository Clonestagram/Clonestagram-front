import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ✅ Tailwind CSS 적용됨
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
