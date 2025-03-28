// src/api/fetchPostByHashtags.ts
import { FeedResponseDto } from "./fetchFeedAPI";
import { fetchLikeCount } from "./fetchPostLilkes";

export const fetchPostByHashtags = async (
  tag: string
): Promise<FeedResponseDto[]> => {
  try {
    const response = await fetch(
      `http://localhost:8080/search/tag?keyword=${encodeURIComponent(tag)}`
    );

    if (!response.ok) {
      throw new Error(`❌ 해시태그 검색 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 해시태그 검색 결과:", data);

    const posts = data.content?.content ?? []; // Page<PostInfoDto>

    const enrichedPosts: FeedResponseDto[] = await Promise.all(
      posts.map(async (post: any) => {
        const likeCount = await fetchLikeCount(post.id);

        return {
          feedId: 0, // feedId는 없음
          postId: post.id,
          userId: post.userId, // 유저 정보가 없으면 0 또는 생략
          username: "", // 서버에서 username 전달하지 않으면 빈 값 처리
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
