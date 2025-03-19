import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile.tsx";
import PostDetail from "./pages/PostDetail";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar /> {/* 왼쪽 네비게이션 바 */}
        <Box flex={1} sx={{ maxWidth: 600, margin: "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Rightbar /> {/* 오른쪽 사이드바 */}
      </Box>
    </Router>
  );
}

export default App;
