import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Post from "./Post";
import "/src/styles/styles.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { FeedResponseDto } from "../api/fetchFeedAPI";

interface CommentButtonProps {
  data: FeedResponseDto;
}

const CommentButton: React.FC<CommentButtonProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false); // ✅ 팝업 상태 관리


  const [posts, setPosts] = useState<FeedResponseDto[]>([]);

  const handlePostUpdate = (postId: string, newContent: string) => {
    setPosts(prev =>
      prev.map(p => p.postId === postId ? { ...p, content: newContent } : p)
    );
  };
  
  const handleOpen = () => {
    console.log("팝업 열기", data.postId); // ✅ 콘솔 확인
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
            {data ? (
            <Post data={data} onUpdate={handlePostUpdate}/>
            ) : (
            <p>게시물을 찾을 수 없습니다.</p>
            )}
        </DialogContent>
        </Dialog>
        </div>
        );
    };

export default CommentButton;
