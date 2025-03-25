import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import Upload from "./components/Upload";
import SearchSlider from "./components/SearchSlider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const showRightbar = useMediaQuery('(min-width: 1000px)');

  const [showUpload, setShowUpload] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(isMobile);

  useEffect(() => {
    if (!isSearchOpen) {
      setIsCompact(isMobile);
    }
  }, [isMobile, isSearchOpen]);

  const handleOpenUpload = () => setShowUpload(true);
  const handleCloseUpload = () => setShowUpload(false);

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    setIsCompact(true); // 검색 열릴 때 compact 모드로 고정
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setIsCompact(isMobile);
  };

  return (
    <Router>
      <Box display="flex" sx={{ overflowX: "hidden", width: "100vw" }}>
        <Box flex="0 0 auto" sx={{ paddingRight: "250px"}}>
          <Sidebar
            isCompact={isCompact}
            onOpenUpload={handleOpenUpload}
            onToggleSearch={handleToggleSearch}
          />
        </Box>

        <Box display="flex" flex="1 1 1000px" sx={{  overflow: 'auto', height: "2000px", justifyContent: "flex-start" }}>
          <Box display="flex" flexDirection="row" flex="1" sx={{ justifyContent: "flex-start" }}>
            <Box flex="0 0 520px" sx={{ margin: "auto", marginTop: "10px", height: "2000px", backgroundColor: "white" }}>
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
                <Rightbar />
              </Box>
            )}
          </Box>
        </Box>

        {/* 검색 슬라이더 오버레이 */}
        {isSearchOpen && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1500,
              backgroundColor: "rgba(0, 0, 0, 0.0)",
            }}
            onClick={handleCloseSearch}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: isCompact ? "90px" : "250px",
                width: "400px",
                height: "100vh",
                backgroundColor: "white",
                boxShadow: 3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchSlider isOpen={isSearchOpen} onClose={handleCloseSearch} />
            </Box>
          </Box>
        )}
      </Box>

      {/* 업로드 팝업 */}
      {showUpload && (
        <div className="modal-overlay" onClick={handleCloseUpload}>
          <button className="overlay-close-button" onClick={handleCloseUpload}>
            <CloseIcon fontSize="medium" />
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Upload />
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
