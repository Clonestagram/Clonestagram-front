// src/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import SearchSlider from "./components/SearchSlider";
import Upload from "./components/Upload";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import HashtagPosts from "./pages/HashtagPosts";
import PostDetail from "./pages/PostDetail";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Signup from "./pages/Signup";
import Reels from "./pages/Reels";
import ProfileEdit from "./pages/ProfileEdit";

const App: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const showRightbar = useMediaQuery("(min-width: 1000px)");
  const location = useLocation(); // ✅ 이제 사용 가능

  const [showUpload, setShowUpload] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(isMobile);



  useEffect(() => {
    if (!isSearchOpen) setIsCompact(isMobile);
  }, [isMobile, isSearchOpen]);

  const handleOpenUpload = () => setShowUpload(true);
  const handleCloseUpload = () => setShowUpload(false);

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    setIsCompact(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setIsCompact(isMobile);
  };


  return (
 
  

    <Box display="flex" sx={{ overflowX: "hidden", width: "100vw" }}>

      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
      {/* Sidebar */}
      <Box flex="0 0 auto" sx={{ paddingRight: "250px" }}>
        <Sidebar
          isCompact={isCompact}
          onOpenUpload={handleOpenUpload}
          onToggleSearch={handleToggleSearch}
        />
      </Box>


      {/* Main Content */}
      <Box display="flex" flex="1 1 1000px" sx={{ height: "100%", overflow: "auto" }}>
        <Box flex="1" sx={{ margin: "auto", marginTop: "10px", maxWidth: "1000px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name/" element={<Profile />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/HashtagPosts/:tag" element={<HashtagPosts />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Box>

        {/* Rightbar - 특정 페이지에서 숨기기 */}
        {!location.pathname.startsWith("/profile")&& !location.pathname.startsWith("/HashtagPosts") && showRightbar && (
          <Box flex="0 0 400px">
            <Rightbar />
          </Box>
        )}
      </Box>

      {/* SearchSlider */}
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
    onClick={handleCloseSearch} // 바깥 클릭 시 닫힘
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
      onClick={(e) => e.stopPropagation()} // ❗️ 슬라이더 안 클릭은 닫힘 방지
    >
      <SearchSlider isOpen={isSearchOpen} onClose={handleCloseSearch} />
    </Box>
  </Box>
)}


      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-overlay" onClick={handleCloseUpload}>
          <button className="overlay-close-button" onClick={handleCloseUpload}>
            <CloseIcon fontSize="medium" />
          </button>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Upload />
          </div>
        </div>
      )}
    </Box>

  );
};

export default App;
