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

  const isVideo = (url: string): boolean => {
    return /\.(mp4|mov|webm)$/i.test(url) || url.toLowerCase().includes("video");
  };

  const thumbnailUrl = isVideo(data.mediaUrl)
    ? data.mediaUrl
        .replace("/upload/", "/upload/so_1,w_400,h_300,c_fill/")
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : data.mediaUrl;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="post-thumbnail" onClick={handleOpen}>
        {isVideo(data.mediaUrl) ? (
          <video
            src={data.mediaUrl}
            className="post-media"
            preload="metadata"
            muted
            controls={false}
          />
        ) : (
          <img src={data.mediaUrl} alt="post" className="post-media" />
        )}
      </div>

      {/* MUI 다이얼로그 */}
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
          {/* ✅ 상세 Post 렌더링 */}
          <Post data={data} onDelete={onDelete}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostBox;
