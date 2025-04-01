export const fetchUserId = async ( username : String ) => {
    try {
      const response = await fetch(`http://localhost:8080/user/id?username=${username}`, {
        method: "GET",
        credentials: "include",
        // 임시 유저 기반이라면 Authorization 생략
      });
  
      if (!response.ok) {
        throw new Error(`❌ uid 요청 실패: ${response.status}`);
      }
  
      const data = await response.text();
      console.log("📥 uid 불러오기 성공:", data);
      return data;
    } catch (error) {
      console.error("❌ uid 불러오기 실패:", error);
      return null;
    }
  };
  