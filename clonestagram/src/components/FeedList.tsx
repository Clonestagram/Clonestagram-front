import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { useLoginUser } from "../hooks/useLoginUser";
import {
  fetchUserFeed,
  removeSeenFeeds,
  FeedResponseDto,
  fetchAllFeeds,
  fetchFollowingFeeds,
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

  const { loginUser } = useLoginUser();

  // ✅ type이 바뀔 때 초기 데이터 불러오기
  useEffect(() => {
    const loadInitialFeeds = async () => {
      setFeeds([]);
      setPage(0);
      setHasMore(true);
      setIsLoading(true);

      try {
        let data: FeedResponseDto[] = [];

        if (type === "nonSeen") {
          data = await fetchUserFeed(0);
        } else if (type === "following" && loginUser) {
          data = await fetchFollowingFeeds(loginUser.id);
        } else if (type === "seeAll" && loginUser) {
          data = await fetchAllFeeds();
        }

        if (data.length > 0) {
          setFeeds(data);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("❌ 피드 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialFeeds();
  }, [type, loginUser]);

  // ✅ 무한스크롤: 추가 페이지 불러오기
  useEffect(() => {
    if (page === 0 || isLoading || !hasMore) return;

    const loadMoreFeeds = async () => {
      setIsLoading(true);

      try {
        let data: FeedResponseDto[] = [];

        if (type === "nonSeen") {
          data = await fetchUserFeed(page);
        } else if (type === "following" && loginUser) {
          data = await fetchFollowingFeeds(loginUser.id);
        } else if (type === "seeAll" && loginUser) {
          data = await fetchAllFeeds();
        }

        if (data.length > 0) {
          setFeeds((prev) => {
            const combined = [...prev, ...data];
            const uniqueMap = new Map(combined.map((item) => [item.feedId, item]));
            return Array.from(uniqueMap.values());
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("❌ 추가 피드 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoreFeeds();
  }, [page]);

  // ✅ 스크롤 감지
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

  // ✅ 게시물 확인 처리
  const handlePostSeen = (postId: string) => {
    if (type !== "nonSeen") return;

    if (!seenPostIds.has(postId)) {
      setSeenPostIds((prev) => new Set(prev).add(postId));
    }
  };

  // ✅ 일정 개수 본 게시물 제거
  useEffect(() => {
    const sendSeen = async () => {
      if (type !== "nonSeen" || seenPostIds.size < 5) return;

      const ids = Array.from(seenPostIds);
      const success = await removeSeenFeeds(ids);

      if (success) {
        setSeenPostIds(new Set());
      }
    };

    sendSeen();
  }, [seenPostIds, type]);

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
