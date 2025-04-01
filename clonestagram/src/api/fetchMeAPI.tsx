// src/api/fetchMe.ts
export const fetchMe = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/me", {
        method: "GET",
        credentials: "include", // 세션 기반 인증 유지
      });
  
      if (!res.ok) throw new Error("세션 만료");
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("❌ 자동 로그인 실패:", err);
      return null;
    }
  };
  