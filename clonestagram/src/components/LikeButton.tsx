import "/src/styles/styles.css";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 하트

import { fetchLikeCount, toggleLike } from "../api/fetchPostLilkes";

interface LikeButtonProps {
  postId: string; // 게시물 ID
  column?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, column }) => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false); // 💡 실제로는 서버에서 liked 상태도 받아오는 게 이상적

  // 좋아요 개수 불러오기
  const loadLikeCount = async () => {
    const count = await fetchLikeCount(postId);
    setLikeCount(count);
  };

  const handleLikeClick = async () => {
    const success = await toggleLike(postId);
    if (success) {
      setLiked(!liked); // UI 상태 반전
      await loadLikeCount(); // 서버에서 최신 개수 다시 불러오기
    }
  };

  // 컴포넌트 마운트 시 초기 좋아요 개수 조회
  useEffect(() => {
    loadLikeCount();
  }, [postId]);

  return (
    <div
    className="like-container"
    style={{
      display: "flex",
      flexDirection: column ? "column" : "row",
      alignItems: "center",
      gap: "1px", // 여백 추가
    }}
  >
      <IconButton onClick={handleLikeClick}>
        {liked ? <FavoriteIcon fontSize="large" color="error" /> : <FavoriteBorderIcon fontSize="large" />}
      </IconButton>
      <span>좋아요 {likeCount}개</span>
    </div>
  );
};

export default LikeButton;
