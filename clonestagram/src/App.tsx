import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // ✅ 인스턴스 생성


function App() {
  const isCompact = useMediaQuery('(max-width: 800px)'); // 800px 이하일 때 Sidebar compact 버전 사용
  const showRightbar = useMediaQuery('(min-width: 1000px)'); // 1000px 이상일 때 Rightbar 표시

  return (
    <Router>
      <Box display="flex">

        <Box flex="0.2 0.2 250px" sx={{backgroundColor: "lightgray", marginRight: "25px"}}> 
          <Sidebar isCompact={isCompact} /> {/* 왼쪽 네비게이션 바 */}
        </Box>

        <Box display="flex" flex="1 1 1200px" sx={{ overflow: 'auto', height: "2000px", justifyContent: "flex-start" }}>
          <Box display="flex" flexDirection="row" flex="1" sx={{ marginLeft: "30px", justifyContent: "flex-start" }}>
            <Box flex="0 0 520px" sx={{ margin: "auto", marginTop: "10px", height: "2000px", backgroundColor: "lightgray"}}>
            <QueryClientProvider client={queryClient}>
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
              </QueryClientProvider>
            </Box>
            {showRightbar && (
              <Box flex="0 0 400px">
                <Rightbar /> {/* 오른쪽 사이드바 */}
              </Box>
            )}
            </Box>
        </Box>
  
      </Box>
    </Router>
  );
}

export default App;