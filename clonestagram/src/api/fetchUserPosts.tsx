import { FeedResponseDto } from "./fetchFeedAPI";
import { fetchLikeCount } from "./fetchPostLilkes";

export const fetchUserPosts = async (profileId: string): Promise<FeedResponseDto[]> => {
  try {
    const response = await fetch(`http://localhost:8080/feeds/user?userId=${profileId}`,{
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`❌ 게시물 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 전체 응답:", data); // ✅ 확인용

    const posts = data.feed?.content ?? []; // ✅ 안전하게 content 접근
    console.log("📌 추출된 게시물 목록:", posts); // ✅ 게시글 목록 확인

    const postsWithLikes: FeedResponseDto[] = await Promise.all(
      posts.map(async (post: any) => {
        const likeCount = await fetchLikeCount(post.id); // 💡 postId = post.id
        return {
          feedId: 0, // user feed라면 feedId는 불필요하거나 생략 가능
          postId: post.id,
          userId: profileId as unknown as number,
          username: data.user.username,
          content: post.content,
          mediaUrl: post.mediaName,
          createdAt: post.createdAt,
          likeCount,
        };
      })
    );

    return postsWithLikes;
  } catch (error) {
    console.error("❌ 사용자 피드 불러오기 실패:", error);
    return [];
  }
};
