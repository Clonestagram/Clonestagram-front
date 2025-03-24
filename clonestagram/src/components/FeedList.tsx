import { useState, useEffect } from "react";
import Feed from "./Feed";
import feedData, { FeedData } from "../data/feedData";

const itemsPerPage = 20;

const FeedList: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [seenPostIds, setSeenPostIds] = useState<Set<number>>(new Set());


  const handlePostSeen = (postId: number) => {
    if (!seenPostIds.has(postId)) {
      console.log(`[Seen] Adding post ${postId} to seenPostIds`);
      setSeenPostIds((prev) => new Set(prev).add(postId));
    }
  };
  

// 서버에 주기적으로 삭제 요청
  useEffect(() => {
    if (seenPostIds.size >= 5) {
      const idsToSend = Array.from(seenPostIds);
      console.log(`[API] Sending seen postIds to server:`, idsToSend);


      fetch("/api/feed/seen", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postIds: idsToSend }),
      });

      setSeenPostIds(new Set()); // 초기화
    }
  }, [seenPostIds]);


  useEffect(() => {
    const loadMoreFeeds = () => {
      const nextFeeds = feedData.slice(0, page * itemsPerPage);
      setFeeds(nextFeeds);
    };

    loadMoreFeeds();
  }, [page]);

  const loadMore = () => {
    if (page * itemsPerPage < feedData.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  

  return (
    <div className="feed-list">
      {feeds.map((feed) => (
        <Feed key={feed.id} data={feed} onSeen={handlePostSeen}/>
      ))}
      {page * itemsPerPage < feedData.length && (
        <button onClick={loadMore} className="load-more-btn">
          더 보기
        </button>
      )}
    </div>
  );
};

export default FeedList;
