import "/src/styles/styles.css";

const Sidebar= () => {
    return (
      <div className="sidebar">
        <ul>
          <li>🏠 홈</li>
          <li>🔍 검색</li>
          <li>💬 메시지</li>
          <li>❤️ 알림</li>
          <li>👤 프로필</li>
        </ul>
      </div>
    );
  };

export default Sidebar;