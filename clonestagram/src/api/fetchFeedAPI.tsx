
import getLoginUser from "../data/loginUser";

export interface FeedResponseDto {
    feedId: string;
    postId: string;
    authorId: string;
    viewerId: string;
    username: string;
    content: string;
    mediaUrl: string;
    createdAt: string; // Date 문자열
    likeCount: number
  }

export const fetchUserFeed = async (page = 0, size = 20): Promise<FeedResponseDto[]> => {
  const user = getLoginUser().id;

  try {
    const response = await fetch(`http://localhost:8080/api/feed?page=${page}&size=${size}&userId=${user}`, {
      method: "GET",
    //   credentials: "include", // 인증된 요청
    });

    if (!response.ok) throw new Error("❌ 피드 조회 실패");

    const data = await response.json();
    console.log("✅ 피드 데이터:", data);

    return data.content || [];
  } catch (error) {
    console.error("❌ 피드 호출 오류:", error);
    return [];
  }
};


// src/api/removeSeenFeeds.ts

export const removeSeenFeeds = async (postIds: string[]) => {
    try {
      const res = await fetch("http://localhost:8080/api/feed/seen", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // 인증이 필요하다면 추가
        body: JSON.stringify({ postIds }),
      });
  
      if (!res.ok) throw new Error("❌ 피드 삭제 실패");
  
      console.log("🗑️ 본 게시물 삭제 완료");
      return true;
    } catch (err) {
      console.error("❌ 삭제 중 오류:", err);
      return false;
    }
  };

  export const fetchAllFeeds = async (page: number): Promise<FeedResponseDto[]> => {
    try {
      const res = await fetch(`http://localhost:8080/feeds/all?page=${page}`);
      if (!res.ok) throw new Error("❌ 전체 피드 조회 실패");
  
      const data = await res.json();
      console.log("✅ 전체 피드 조회 결과:", data);
  
      const viewerId = getLoginUser().id;
  
      return (data.feed.content || []).map((item: any) => ({
        feedId: item.id.toString(),
        postId: item.id.toString(),
        authorId: item.userId.toString(),
        viewerId: viewerId.toString(),
        username: data.user.username,
        content: item.content,
        mediaUrl: item.mediaName,
        createdAt: item.createdAt,
        likeCount: 0,
      }));
    } catch (err) {
      console.error("❌ 전체 피드 오류:", err);
      return [];
    }
  };
  
  export const fetchFollowingFeeds = async (page: number): Promise<FeedResponseDto[]> => {
    try {
      const res = await fetch(`http://localhost:8080/feeds/follow?page=${page}`);
      if (!res.ok) throw new Error("❌ 팔로우 피드 조회 실패");
  
      const data = await res.json();
      console.log("✅ 팔로우 피드 조회 결과:", data);
  
      const viewerId = getLoginUser().id;
  
      return (data.feed.content || []).map((item: any) => ({
        feedId: item.id.toString(),
        postId: item.id.toString(),
        authorId: item.userId.toString(),
        viewerId: viewerId.toString(),
        username: data.user.username,
        content: item.content,
        mediaUrl: item.mediaName,
        createdAt: item.createdAt,
        likeCount: 0,
      }));
    } catch (err) {
      console.error("❌ 팔로우 피드 오류:", err);
      return [];
    }
  };