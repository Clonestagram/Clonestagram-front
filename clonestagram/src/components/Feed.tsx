import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";
import Contents from "./Contents";
import { FeedResponseDto } from "../api/fetchFeedAPI"
import { usePostSeenObserver } from "../hooks/usePostSeenObserver";
import "/src/styles/styles.css"; // 스타일 import 확인!
import { use, useEffect } from "react";

interface FeedProps {
  data: FeedResponseDto;
  onSeen: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ data, onSeen }) => {

  useEffect(() => {
    console.log("Feed 컴포넌트 렌더링", data);
  } , [data.postId]);

  const ref = usePostSeenObserver(data.postId, onSeen);
  return (
    <div ref={ref} className="feed">
      {/* 작성자 이름 */}
      <div className="feed-header">
        <span className="username">{data.username}</span>
      </div>

      {/* 이미지 콘텐츠 */}
      <Contents image={data.mediaUrl} />

      {/* 게시물 본문 */}
      <div className="feed-caption">
        <strong>{data.username}</strong> {data.content}
      </div>

      {/* 액션 버튼들 */}
      <div className="action-buttons">
      <LikeButton postId={data.postId.toString()} column={true} />
        <CommentButton data={data} />
        <ShareButton />
      </div>
    </div>
  );
};

export default Feed;
