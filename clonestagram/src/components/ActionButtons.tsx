import { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 좋아요 아이콘
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import "/src/styles/styles.css";

interface ActionButtonsProps {
  onCommentClick: () => void; // 댓글 버튼 클릭 이벤트
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCommentClick }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likesCount, setLikesCount] = useState(0); // 좋아요 개수

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  // 공유 버튼 클릭 핸들러 (링크 복사 예제)
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="action-buttons">
      {/* 좋아요 버튼 */}
      <IconButton onClick={handleLikeClick}>
        {liked ? <FavoriteIcon fontSize="large" color="error" /> : <FavoriteBorderIcon fontSize="large" />}
      </IconButton>
      <span>{likesCount}</span>

      {/* 댓글 버튼 */}
      <IconButton onClick={onCommentClick}>
        <ChatBubbleOutlineIcon fontSize="large" />
      </IconButton>

      {/* 공유 버튼 */}
      <IconButton onClick={handleShareClick}>
        <SendIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default ActionButtons;
