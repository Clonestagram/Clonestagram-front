// src/api/fetchCommentsByPostId.ts

export interface PostComment {
    id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: string;
  }
  
  export const fetchCommentsByPostId = async (postId: string): Promise<PostComment[]> => {
    try {
      const res = await fetch(`http://localhost:8080/comments/post/${postId}`);
      if (!res.ok) throw new Error("❌ 댓글 목록 조회 실패");
  
      const data = await res.json();
      console.log("💬 댓글 목록:", data);
      return data;
    } catch (err) {
      console.error("❌ 댓글 목록 조회 오류:", err);
      return [];
    }
  };
  
  // src/api/createComment.ts

export const createComment = async (postId: string, userId: string, content: string) => {
    try {
      const res = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId,
          content,
        }),
      });
  
      if (!res.ok) throw new Error("❌ 댓글 작성 실패");
  
      const data = await res.json();
      console.log("✅ 댓글 작성 완료:", data);
      return data;
    } catch (err) {
      console.error("❌ 댓글 작성 오류:", err);
      return null;
    }
  };
  
  // src/api/deleteComment.ts

export const deleteComment = async (commentId: string, requesterId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/comments/${commentId}?requesterId=${requesterId}`,
        { method: "DELETE" }
      );
  
      if (!res.ok) throw new Error("❌ 댓글 삭제 실패");
  
      const message = await res.text();
      console.log("🗑️ 댓글 삭제 완료:", message);
      return true;
    } catch (err) {
      console.error("❌ 댓글 삭제 오류:", err);
      return false;
    }
  };
  