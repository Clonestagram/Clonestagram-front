import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";
import Contents from "./Contents";
import { FeedData } from "../data/feedData";
import { usePostSeenObserver } from "../hooks/usePostSeenObserver";
import "/src/styles/styles.css"; // 스타일 import 확인!

interface FeedProps {
  data: FeedData;
  onSeen: (postId: number) => void;
}

const Feed: React.FC<FeedProps> = ({ data, onSeen }) => {
  const ref = usePostSeenObserver(data.id, onSeen);
  return (
    <div ref={ref} className="feed">
      {/* 작성자 이름 */}
      <div className="feed-header">
        <span className="username">{data.username}</span>
      </div>

      {/* 이미지 콘텐츠 */}
      <Contents image={data.image} />

      {/* 게시물 본문 */}
      <div className="feed-caption">
        <strong>{data.username}</strong> {data.content}
      </div>

      {/* 액션 버튼들 */}
      <div className="action-buttons">
        <LikeButton likes={data.likes} />
        <CommentButton postId={data.id} />
        <ShareButton />
      </div>
    </div>
  );
};

export default Feed;
