import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import Contents from "./Contents";
import ProfilePicture from "./ProfilePicture"; // 👈 추가
import { FeedResponseDto } from "../api/fetchFeedAPI";
import { usePostSeenObserver } from "../hooks/usePostSeenObserver";
import "/src/styles/styles.css";
import { useEffect } from "react";
import { useAuthorData } from "../hooks/useAuthorData";
import defaultProfileImg from "/public/profileImg.jpg";

interface FeedProps {
  data: FeedResponseDto;
  onSeen: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ data, onSeen }) => {
  useEffect(() => {
    console.log("Feed 컴포넌트 렌더링", data);
  }, [data.postId]);

  const { userData } = useAuthorData(data);
  const ref = usePostSeenObserver(data.postId, onSeen);

  return (
    <div ref={ref} className="feed">
      {/* 작성자 정보 */}
      <div className="feed-header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ProfilePicture
          profileImageUrl={userData?.profileimg || defaultProfileImg}
          username={userData?.username || "unknown"}
          size={30}
        />
        <span className="username">{userData?.username}</span>
      </div>

      {/* 이미지 콘텐츠 */}
      <Contents image={data.mediaUrl} />

      {/* 게시물 본문 */}
      <div className="feed-caption">
        <strong>{userData?.username}</strong> {data.content}
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
