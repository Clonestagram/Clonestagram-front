export const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/1/profile", {
        method: "GET",
        // 임시 유저 기반이라면 Authorization 생략
      });
  
      if (!response.ok) {
        throw new Error(`❌ 게시물 요청 실패: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("📥 사용자 피드 불러오기 성공:", data);
      return data;
    } catch (error) {
      console.error("❌ 사용자 피드 불러오기 실패:", error);
      return null;
    }
  };
  