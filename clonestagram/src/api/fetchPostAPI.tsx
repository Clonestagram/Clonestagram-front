// src/api/fetchPostById.ts
export interface PostInfoDto {
    id: number;
    content: string;
    mediaName: string;
    contentType: string;
    createdAt: string;
  }
  // 필요한 경우 좋아요 수, 댓글 등도 추가

export const fetchPostById = async (postId: number): Promise<PostInfoDto | null> => {
  try {
    const response = await fetch(`http://localhost:8080/feeds/post/${postId}`);
    if (!response.ok) {
      throw new Error(`❌ 게시물 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("📥 게시물 데이터:", data);
    return data;
  } catch (error) {
    console.error("❌ 게시물 조회 에러:", error);
    return null;
  }
};

// ✅ 게시물 삭제 요청 함수
export const deletePostById = async (postId: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/image/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`삭제 실패: ${response.status}`);
      }
  
      console.log(`🗑️ 게시물 ${postId} 삭제 완료`);
      return true;
    } catch (error) {
      console.error("❌ 게시물 삭제 오류:", error);
      return false;
    }
  };
  
  // ✅ 게시물 수정 요청 함수
  export const updatePostById = async (
    postId: string,
    updateData: {
      content: string;
      mediaName?: string; // 선택사항 (새로운 이미지 경로 등)
    }
  ): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append("content", updateData.content);
      if (updateData.mediaName) {
        formData.append("mediaName", updateData.mediaName);
      }
  
      const response = await fetch(`http://localhost:8080/image/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`수정 실패: ${response.status}`);
      }
  
      console.log(`✏️ 게시물 ${postId} 수정 완료`);
      return true;
    } catch (error) {
      console.error("❌ 게시물 수정 오류:", error);
      return false;
    }
  };
  
  export const updatePostContent = async (postId: string, content: string): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append("content", content);
  
      const res = await fetch(`http://localhost:8080/image/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error("❌ 게시물 수정 실패");
      }
  
      console.log("✅ 게시물 수정 완료");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  