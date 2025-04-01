import React, { useState } from "react";
import "/src/styles/styles.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Post from "./Post"; // ✅ 실제 상세 Post 컴포넌트 import 필요
import { FeedResponseDto } from "../api/fetchFeedAPI";

interface PostBoxProps {
  data: FeedResponseDto;
  onDelete?: () => void; // ✅ 삭제 콜백
}
const PostBox: React.FC<PostBoxProps> = ({ data, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState(data); // ✅ state로 관리

  const isVideo = (url: string): boolean =>
    /\.(mp4|mov|webm)$/i.test(url) || url.toLowerCase().includes("video");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostUpdate = (postId: string, newContent: string) => {
    setPostData(prev => ({
      ...prev,
      content: newContent,
    }));
  };

  return (
    <>
      <div className={"post-thumbnail"} onClick={handleOpen}>
        {isVideo(postData.mediaUrl) ? (
          <video
            src={postData.mediaUrl}
            className="post-media"
            preload="metadata"
            muted
            controls={false}
          />
        ) : (
          <img src={postData.mediaUrl} alt="post" className="post-media" />
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        PaperProps={{
          style: {
            width: "1250px",
            maxHeight: "90vh",
            borderRadius: "12px",
            overflow: "hidden",
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
          <Post data={postData} onDelete={onDelete} onUpdate={handlePostUpdate} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostBox;
