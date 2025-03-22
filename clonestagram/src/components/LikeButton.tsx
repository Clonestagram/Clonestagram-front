import "/src/styles/styles.css";
import { useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 좋아요 아이콘
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface LikeButtonProps {
  likes?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes = 0 }) => {
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div>
      {/* 좋아요 버튼 */}
      <IconButton onClick={handleLikeClick}>
        {liked ? <FavoriteIcon fontSize="large" color="error" /> : <FavoriteBorderIcon fontSize="large" />}
      </IconButton>
      <span>{likeCount}</span>
      </div>
  );
};

export default LikeButton;
