
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

  interface PostInfoDto {
    id: number;
    content: string;
    userId: number;
    mediaName: string;
    contentType: string;
    createdAt: string;
  }
  
  interface UserProfileDto {
    id: number;
    username: string;
    // 프로필 이미지 등 필요한 필드 추가
  }
  
  interface PostResDto {
    user: UserProfileDto;
    feed: {
      content: PostInfoDto[];
      // pageNumber, totalPages 등 다른 페이징 필드 필요시 추가
    };
  }

// ✅ 공통 피드 응답 파싱 함수
const parseFeedResponse = (data: any, viewerId: string): FeedResponseDto[] => {
  return (data.feed?.content || []).map((item: any) => ({
    feedId: item.id.toString(),
    postId: item.id.toString(),
    authorId: item.userId.toString(),
    viewerId,
    username: item.username, // feed 응답에서 각 item의 username을 포함하도록 해야 정확함
    content: item.content,
    mediaUrl: item.mediaName,
    createdAt: item.createdAt,
    likeCount: 0, // 추후 필요 시 수정 가능
  }));
};

// ✅ 사용자 피드 조회 (아직 viewerId 불필요)
export const fetchUserFeed = async (page: number): Promise<FeedResponseDto[]> => {
  try {
    const res = await fetch(`http://localhost:8080/feeds?page=${page}&size=20`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("❌ 피드 조회 실패");
    const data = await res.json();
    console.log("✅ 피드 데이터:", data);
    return data.content || [];
  } catch (error) {
    console.error("❌ 피드 호출 오류:", error);
    return [];
  }
};

// ✅ 본 게시물 삭제
export const removeSeenFeeds = async (postIds: string[]) => {
  try {
    const res = await fetch("http://localhost:8080/feeds/seen", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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

// ✅ 전체 피드 조회 (viewerId 외부에서 주입)
export const fetchAllFeeds = async (): Promise<FeedResponseDto[]> => {
  try {
    const res = await fetch("http://localhost:8080/feeds/all", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("❌ 전체 피드 조회 실패");

    const data: PostResDto = await res.json();
    const viewerId = data.user?.id?.toString() || "unknown";
    const username = data.user?.username || "anonymous";

    const feedItems = data.feed?.content ?? [];

    const mappedFeeds = feedItems.map((item) => ({
      feedId: item.id.toString(),
      postId: item.id.toString(),
      authorId: item.userId?.toString() || "unknown", // ✅ 각 피드의 작성자 ID 사용
      viewerId,
      username,
      content: item.content ?? "",
      mediaUrl: item.mediaName ?? "",
      createdAt: item.createdAt ?? "",
      likeCount: 0,
    }));

    console.log("✅ 전체 피드 조회 결과:", mappedFeeds);
    return mappedFeeds;
  } catch (err) {
    console.error("❌ 전체 피드 오류:", err);
    return [];
  }
};

// ✅ 팔로우 피드 조회 (viewerId 외부에서 주입)
export const fetchFollowingFeeds = async (viewerId: string): Promise<FeedResponseDto[]> => {
  try {
    const res = await fetch(`http://localhost:8080/feeds/follow`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("❌ 팔로우 피드 조회 실패");
    const data = await res.json();
    console.log("✅ 팔로우 피드 조회 결과:", data);
    return parseFeedResponse(data, viewerId);
  } catch (err) {
    console.error("❌ 팔로우 피드 오류:", err);
    return [];
  }
};
