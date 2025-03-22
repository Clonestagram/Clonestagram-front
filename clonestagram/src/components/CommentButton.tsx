import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Post from "./Post";
import feedData from "../data/feedData"; // ✅ feedData 가져오기
import "/src/styles/styles.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface CommentButtonProps {
  postId: number;
}

const CommentButton: React.FC<CommentButtonProps> = ({ postId }) => {
  const [open, setOpen] = useState<boolean>(false); // ✅ 팝업 상태 관리

  // ✅ 특정 postId에 맞는 데이터 찾기
  const postData = feedData.find((post) => post.id === postId);

  const handleOpen = () => {
    console.log("팝업 열기", postId); // ✅ 콘솔 확인
    setOpen(true);
  };

  const handleClose = () => {
    console.log("팝업 닫기");
    setOpen(false);
  };

  return (
    <div>
      {/* 댓글 버튼 */}
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        💬 댓글
      </Button> */}
      <IconButton onClick={handleOpen}>
        <ChatBubbleOutlineIcon fontSize="large" />
      </IconButton>

      {/* MUI 다이얼로그 (팝업) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          게시물 상세보기
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* ✅ postData가 있을 경우에만 Post 컴포넌트 렌더링 */}
          {postData ? <Post postId={postId} data={postData} /> : <p>게시물을 찾을 수 없습니다.</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentButton;
