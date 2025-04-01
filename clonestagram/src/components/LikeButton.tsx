import "/src/styles/styles.css";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { likeState } from "../recoil/likeState";
import { likeCountState } from "../recoil/likeCountState";

import { fetchLikeCount, toggleLike, fetchMyLikeStatus } from "../api/fetchPostLilkes";

interface LikeButtonProps {
  postId: string; // 게시물 ID
  column?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, column }) => {
  const [liked, setLiked] = useRecoilState(likeState(postId));
  const [likeCount, setLikeCount] = useRecoilState(likeCountState(postId));

  const loadLikeData = async () => {
    const count = await fetchLikeCount(postId);
    const likedStatus = await fetchMyLikeStatus(postId);
    setLikeCount(count);
    setLiked(likedStatus);
  };

  const handleLikeClick = async () => {
    const success = await toggleLike(postId);
    if (success) {
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    }
  };

  useEffect(() => {
    loadLikeData();
  }, [postId]);

  return (
    <div
      className="like-container"
      style={{
        display: "flex",
        flexDirection: column ? "column" : "row",
        alignItems: "center",
        gap: "1px",
      }}
    >
      <IconButton onClick={handleLikeClick}>
        {liked ? (
          <FavoriteIcon fontSize="large" color="error" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </IconButton>
      <span>좋아요 {likeCount}개</span>
    </div>
  );
};

export default LikeButton;
