import React from "react";
import { Link } from "react-router-dom";
import "/src/styles/styles.css";
import {
  Home,
  Search,
  Compass,
  Film,
  Send,
  Heart,
  PlusSquare,
  User,
  Instagram
} from 'lucide-react';
import { useLoginUser } from "../hooks/useLoginUser";
import LogoutButton from "./LogoutButton";

interface SidebarProps {
  isCompact: boolean;
  onOpenUpload: () => void;
  onToggleSearch: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCompact, onOpenUpload, onToggleSearch }) => {
  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 16px',
    color: 'black',
    textDecoration: 'none',
    justifyContent: isCompact ? "center" : "flex-start"
  } as const;

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    backgroundColor: 'white',
    borderRight: '1px solid #ddd',
    zIndex: 1000,
    width: isCompact ? '94px' : '250px',
  } as const;

  const { loginUser } = useLoginUser(); // ✅ 훅에서 상태 가져오기
  const username = loginUser?.username; // ✅ 안전하게 접근

  return (
    <div style={sidebarStyle} className={isCompact ? "sidebar-compact" : "sidebar"}>
      <div>
        <Link to="/" style={{ ...itemStyle, padding: isCompact ? '37px 0' : '20px 0' }}>
          {isCompact ? (
            <Instagram size={30} />
          ) : (
            <img
              src="/clonestagram.png"
              alt="logo"
              style={{ width: '60%' }}
            />
          )}
        </Link>

        <Link to="/" style={itemStyle}>
          <Home size={30} /> {!isCompact && '홈'}
        </Link>
        <div onClick={onToggleSearch} style={{ ...itemStyle, cursor: 'pointer' }}>
          <Search size={30} /> {!isCompact && '검색'}
        </div>
        <Link to="/explore" style={itemStyle}>
          <Compass size={30} /> {!isCompact && '탐색 탭'}
        </Link>
        <Link to="/reels" style={itemStyle}>
          <Film size={30} /> {!isCompact && '릴스'}
        </Link>
        <Link to="/messages" style={itemStyle}>
          <Send size={30} /> {!isCompact && '메시지'}
        </Link>
        <Link to="/notifications" style={itemStyle}>
          <Heart size={30} /> {!isCompact && '알림'}
        </Link>
        <div onClick={onOpenUpload} style={{ ...itemStyle, cursor: 'pointer' }}>
          <PlusSquare size={30} /> {!isCompact && '만들기'}
        </div>

        {username && (
          <Link to={`/${username}/`} style={itemStyle}>
            <User size={30} /> {!isCompact && '프로필'}
          </Link>
        )}

        <div style={{ ...itemStyle, marginTop: 200 }}>
        <LogoutButton />
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
