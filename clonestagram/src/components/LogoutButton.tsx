// 예: Header 컴포넌트나 Sidebar 컴포넌트 등에서

import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { loginUserState } from "../recoil/loginUserAtom";
import { fetchLogout } from "../api/fetchLogoutAPI";

const LogoutButton = () => {
  const resetLoginUser = useResetRecoilState(loginUserState);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await fetchLogout();
      resetLoginUser(); // Recoil 상태 초기화
      navigate("/login"); // ✅ 직접 라우팅
    } catch (err) {
      console.error("❌ 로그아웃 실패:", err);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <span
      onClick={handleLogout}
      style={{
        cursor: "pointer",
        color: "#007bff",
      }}
    >
      로그아웃
    </span>
  );
};

export default LogoutButton;
