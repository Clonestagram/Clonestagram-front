import React from "react";
import { Link } from "react-router-dom";
import "/src/styles/styles.css";

interface SidebarProps {
  isCompact: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCompact }) => {
  return (
    <div className={isCompact ? "sidebar compact" : "sidebar"}>
      <ul>
        <li>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            {isCompact ? '🏠' : '🏠 홈'}
          </Link>
        </li>
        <li>
          <Link to="/search" style={{ color: 'black', textDecoration: 'none' }}>
            {isCompact ? '🔍' : '🔍 검색'}
          </Link>
        </li>
        <li>
          <Link to="/messages" style={{ color: 'black', textDecoration: 'none' }}>
            {isCompact ? '💬' : '💬 메시지'}
          </Link>
        </li>
        <li>
          <Link to="/notifications" style={{ color: 'black', textDecoration: 'none' }}>
            {isCompact ? '❤️' : '❤️ 알림'}
          </Link>
        </li>
        <li>
          <Link to="/profile/:username" style={{ color: 'black', textDecoration: 'none' }}>
            {isCompact ? '👤' : '👤 프로필'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
