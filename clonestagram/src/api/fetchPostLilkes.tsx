// src/api/fetchLikeCount.ts

export const fetchLikeCount = async (postId: string): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:8080/feeds/${postId}/likes`,{
      method: "GET",
      credentials: "include", // 세션 또는 쿠키 기반 로그인이라면 필요
    });
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
        credentials: "include", // 세션 또는 쿠키 기반 로그인이라면 필요
      });
  
      if (!res.ok) throw new Error("❌ 좋아요 토글 실패");
      console.log("✅ 좋아요 상태 변경 완료");
      return true;
    } catch (err) {
      console.error("❌ 좋아요 상태 변경 오류:", err);
      return false;
    }
  };
  
  export const fetchMyLikeStatus = async (postId: string): Promise<boolean> => {
    console.log(`📤 좋아요 여부 요청: postId = ${postId}`);
    
    const res = await fetch(`http://localhost:8080/posts/${postId}/liked`, {
      credentials: "include",
    });
  
    const data = await res.text();
    const isLiked = data === "true";
  
    console.log(`📥 좋아요 여부 응답: ${isLiked}`);
    return isLiked;
  };