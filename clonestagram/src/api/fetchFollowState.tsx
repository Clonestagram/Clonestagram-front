export const fetchFollowState = async (
    fromUserId: String,
    toUserId: String
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `http://localhost:8080/follow/${fromUserId}/profile/${toUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`❌ 팔로우 상태 변경 실패: ${response.status}`);
      }
  
      const data = await response.text(); // 서버 응답은 단순 문자열
      console.log("✅ 팔로우 상태 변경 성공:", data);
      return true;
    } catch (error) {
      console.error("❌ 팔로우 상태 변경 오류:", error);
      return false;
    }
  };
  

export const fetchFollowingList = async (userId: String): Promise<string[]> => {
    try {
      const res = await fetch(`http://localhost:8080/follow/${userId}/profile/following`);
      if (!res.ok) throw new Error(`❌ 팔로잉 리스트 조회 실패: ${res.status}`);
      const data = await res.json();
      console.log("📥 팔로잉 리스트 조회 성공:", data);
      return data.map((item: { toUsername: string }) => item.toUsername); // 필요한 형식으로 가공
    } catch (err) {
      console.error("❌ 팔로잉 리스트 조회 오류:", err);
      return [];
    }
  };

  export const deleteFollowRelation = async (fromUserId: string, toUserId: string) => {
    
    const res = await fetch(`http://localhost:8080/follow/${fromUserId}/${toUserId}`, {
      method: "DELETE", 
    });
  
    if (!res.ok) throw new Error("❌ 팔로우 삭제 실패");
  
    const message = await res.text();
    console.log("🗑️ 팔로우 관계 삭제 완료:", message);
    return true;
  };
  
  
  