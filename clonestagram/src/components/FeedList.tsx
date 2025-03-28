import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import {
  fetchUserFeed,
  removeSeenFeeds,
  FeedResponseDto,
  fetchAllFeeds,
} from "../api/fetchFeedAPI";
interface FeedListProps {
  type: "seeAll" | "following" | "nonSeen";
}

const FeedList: React.FC<FeedListProps> = ({ type }) => {
  const [feeds, setFeeds] = useState<FeedResponseDto[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [seenPostIds, setSeenPostIds] = useState<Set<string>>(new Set());


  
  // ✅ 피드 데이터 로딩
  useEffect(() => {
    const loadFeeds = async () => {
      if (isLoading || !hasMore) return;
  
      setIsLoading(true);
      try {
        let data: FeedResponseDto[] = [];
  
        if (type === "nonSeen") {
          data = await fetchUserFeed(page);
        } else if (type === "following") {
          data = await fetchAllFeeds(page);
        } else if (type === "seeAll") {
          data = await fetchAllFeeds(page);
        }
  
        if (data.length > 0) {
          setFeeds((prev) => {
            const combined = [...prev, ...data];
            const uniqueMap = new Map(
              combined.map((item) => [item.feedId, item])
            );
            return Array.from(uniqueMap.values());
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("❌ 피드 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadFeeds();
  }, [page, type]);
  

  useEffect(() => {
    setFeeds([]);
    setPage(0);
    setHasMore(true);
  }, [type]);

  // ✅ 게시물 확인
  const handlePostSeen = (postId: string) => {
    if (type !== "nonSeen") return;
  
    if (!seenPostIds.has(postId)) {
      setSeenPostIds((prev) => new Set(prev).add(postId));
    }
  };

  // ✅ 일정 개수 넘으면 본 게시물 삭제
  useEffect(() => {
    const sendSeen = async () => {
      if (type !== "nonSeen") return; // 🔒 다른 타입일 땐 무시
  
      if (seenPostIds.size >= 5) {
        const ids = Array.from(seenPostIds);
        const success = await removeSeenFeeds(ids);
        if (success) {
          setSeenPostIds(new Set());
        }
      }
    };
    sendSeen();
  }, [seenPostIds, type]);


  // ✅ 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  return (
    <div className="feed-list">
      {feeds.map((feed) => (
        <Feed key={feed.feedId} data={feed} onSeen={handlePostSeen} />
      ))}

      {isLoading && <p>📦 피드를 불러오는 중...</p>}
      {!hasMore && <p>✅ 더 이상 피드가 없습니다.</p>}
    </div>
  );
};

export default FeedList;
