import { FeedResponseDto } from "./fetchFeedAPI";
import { fetchLikeCount } from "./fetchPostLilkes";

export const fetchPostByHashtags = async (
  tag: string,
  viewerId: string // ✅ 로그인 유저 ID를 파라미터로 받음
): Promise<FeedResponseDto[]> => {
  try {
    const response = await fetch(
      `http://localhost:8080/search/tag?keyword=${encodeURIComponent(tag)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`❌ 해시태그 검색 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 해시태그 검색 결과:", data);

    const posts = data.content?.content ?? []; // Page<PostInfoDto>

    const enrichedPosts: FeedResponseDto[] = await Promise.all(
      posts.map(async (post: any) => {
        console.log("📌 post:", post);
        const likeCount = await fetchLikeCount(post.id);

        return {
          feedId: "0", // feedId 없음
          postId: post.id.toString(),
          authorId: post.userId?.toString() || "unknown",
          viewerId, // ✅ 파라미터로 받은 viewerId 사용
          username: "", // 서버에서 내려주지 않으면 빈 문자열로 처리
          content: post.content,
          mediaUrl: post.mediaName,
          createdAt: post.createdAt,
          likeCount,
        };
      })
    );

    return enrichedPosts;
  } catch (error) {
    console.error("❌ 해시태그 게시물 조회 중 오류:", error);
    return [];
  }
};
