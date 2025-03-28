// src/api/fetchLikeCount.ts

export const fetchLikeCount = async (postId: string): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:8080/feeds/${postId}/likes`);
    if (!res.ok) throw new Error("❌ 좋아요 개수 조회 실패");

    const count = await res.json();
    console.log("👍 좋아요 개수:", count);
    return count;
  } catch (err) {
    console.error("❌ 좋아요 개수 조회 오류:", err);
    return 0;
  }
};

// src/api/toggleLike.ts

export const toggleLike = async (postId: string): Promise<boolean> => {
    try {
      const res = await fetch(`http://localhost:8080/feeds/${postId}/likes`, {
        method: "POST",
        // credentials: "include", // 세션 또는 쿠키 기반 로그인이라면 필요
      });
  
      if (!res.ok) throw new Error("❌ 좋아요 토글 실패");
      console.log("✅ 좋아요 상태 변경 완료");
      return true;
    } catch (err) {
      console.error("❌ 좋아요 상태 변경 오류:", err);
      return false;
    }
  };
  