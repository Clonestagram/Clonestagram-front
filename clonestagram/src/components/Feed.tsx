import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";
import Contents from "./Contents";
import { FeedData } from "../data/feedData";
import { usePostSeenObserver } from "../hooks/usePostSeenObserver";

interface FeedProps {
  data: FeedData;
  onSeen: (postId: number) => void;
}

const Feed: React.FC<FeedProps> = ({ data, onSeen }) => {
  const ref = usePostSeenObserver(data.id, onSeen);
  return (
    <div ref={ref} className="feed">
      <h4>{data.username}</h4>
      <Contents content={data.content} image={data.image} />

      <div className="action-buttons">
      <LikeButton likes={data.likes} />
      <CommentButton postId={data.id} />
      <ShareButton />
      </div>
    </div>
  );
};

export default Feed;
