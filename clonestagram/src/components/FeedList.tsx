import { useState, useEffect } from "react";
import Feed from "./Feed";
import feedData, { FeedData } from "../data/feedData";

const itemsPerPage = 20;

const FeedList: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [page, setPage] = useState<number>(1);

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
        <Feed key={feed.id} data={feed} />
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
