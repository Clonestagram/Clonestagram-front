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
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false} // 👉 사이즈 제한 해제
        PaperProps={{
            style: {
                width: "1250px",           // 👉 원하는 팝업 너비
                maxHeight: "90vh",        // 👉 최대 높이 제한
                borderRadius: "12px",
                overflow: "hidden",       // 내부 콘텐츠 넘침 방지
            },
        }}
        >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          게시물 상세보기
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>

        <DialogContent dividers>
            {postData ? (
            <Post postId={postId} data={postData} />
            ) : (
            <p>게시물을 찾을 수 없습니다.</p>
            )}
        </DialogContent>
        </Dialog>
        </div>
        );
    };

export default CommentButton;
