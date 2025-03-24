import React, { useEffect, useState } from "react";
import { useFeedQuery } from "../hooks/useFeedQuery";
import Feed from "./Feed";
import { FeedData } from "../data/feedData";

const FeedList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFeedQuery();

  const allFeeds = data?.pages.flat() ?? [];

  const [seenPostIds, setSeenPostIds] = useState<Set<number>>(new Set());

  // ✅ 게시물 확인 콜백
  const handlePostSeen = (postId: number) => {
    if (!seenPostIds.has(postId)) {
      console.log(`[Seen] Post ${postId} seen (handlePostSeen)`);
      setSeenPostIds((prev) => new Set(prev).add(postId));
    }
  };

  // ✅ 일정 개수 이상이면 삭제 요청 (여기선 mock 처리)
  useEffect(() => {
    if (seenPostIds.size >= 5) {
      const idsToSend = Array.from(seenPostIds);
      console.log("[API] Sending seen postIds:", idsToSend);

      // Mock API 요청
      fetch("/api/feed/seen", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postIds: idsToSend }),
      });

      setSeenPostIds(new Set()); // 초기화
    }
  }, [seenPostIds]);

  // 무한스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p>피드를 불러오는 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="feed-list">
      {allFeeds.map((feed) => (
        <Feed key={feed.id} data={feed} onSeen={handlePostSeen} />
      ))}

      {isFetchingNextPage && <p>다음 피드를 불러오는 중...</p>}
      {!hasNextPage && <p>더 이상 피드가 없습니다.</p>}
    </div>
  );
};

export default FeedList;
