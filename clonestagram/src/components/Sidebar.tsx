import React from "react";
import "/src/styles/styles.css";

interface SidebarProps {
  isCompact: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCompact }) => {
  return (
    <div className={isCompact ? "sidebar compact" : "sidebar"}>
      <ul>
        <li style={{ color: 'black' }}>{isCompact ? '🏠' : '🏠 홈'}</li>
        <li style={{ color: 'black' }}>{isCompact ? '🔍' : '🔍 검색'}</li>
        <li style={{ color: 'black' }}>{isCompact ? '💬' : '💬 메시지'}</li>
        <li style={{ color: 'black' }}>{isCompact ? '❤️' : '❤️ 알림'}</li>
        <li style={{ color: 'black' }}>{isCompact ? '👤' : '👤 프로필'}</li>
      </ul>
    </div>
  );
};

export default Sidebar;