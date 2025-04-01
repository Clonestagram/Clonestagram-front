import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginUserState } from "./recoil/loginUserAtom";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMe } from "./api/fetchMeAPI";
import { useLoginUser } from "./hooks/useLoginUser";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
    const [isInitializing, setIsInitializing] = useState(true);
    const { setLoginUserById } = useLoginUser();
    const loginUser = useRecoilValue(loginUserState);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const init = async () => {
        try {
          const sessionUser = await fetchMe();
          await setLoginUserById(sessionUser.id);
        } catch (err) {
          console.warn("⚠️ 세션 없음. 로그인 필요");
          // ✅ 리다이렉션 전에 초기화 중인 상태 유지
          setLoginUserById(""); // 강제 로그아웃용
          if (!["/login", "/signup"].includes(location.pathname)) {
            navigate("/login", { replace: true });
          }
        } finally {
          setIsInitializing(false); // ✅ 초기화 완료 신호
        }
      };
  
      init();
    }, []);
  
    // 🔒 초기화 중일 땐 children 렌더링 X
    if (isInitializing) return <div>로딩 중...</div>;
  
    return <>{children}</>;
  };
  
export default AppInitializer;
