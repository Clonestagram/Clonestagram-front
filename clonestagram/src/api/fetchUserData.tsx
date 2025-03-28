export const fetchUserData = async ( profileUser : String ) => {
    try {
      console.log("🚀 유저 정보 불러오는 중...", );
      const response = await fetch(`http://localhost:8080/${profileUser}/profile`, {
        method: "GET",
        // 임시 유저 기반이라면 Authorization 생략
      });
  
      if (!response.ok) {
        throw new Error(`❌ 유저 정보 요청 실패: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("📥 유저 정보 불러오기 성공:", data);
      return data;
    } catch (error) {
      console.error("❌ 유저 정보 불러오기 실패:", error);
      return null;
    }
  };
  