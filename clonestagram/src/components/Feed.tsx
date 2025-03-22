import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";
import Contents from "./Contents";
import { FeedData } from "../data/feedData";

interface FeedProps {
  data: FeedData;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  return (
    <div className="feed">
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
