import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from "@mui/icons-material/Close";
import "/src/styles/styles.css";
import EditPostDialog from "./EditPostDialog";
import defaultProfileImg from "/public/profileImg.jpg"
import { FeedResponseDto } from "../api/fetchFeedAPI";
import Contents from "./Contents";
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  PostComment,
} from "../api/fetchCommentAPI";
import { useLoginUser } from "../hooks/useLoginUser";
import { updatePostContent, deletePostById } from "../api/fetchPostAPI";
import ProfilePicture from "./ProfilePicture";
import { fetchUserData } from "../api/fetchUserData";
import LikeButton from "./LikeButton";
import { useAuthorData } from "../hooks/useAuthorData";

interface PostProps {
  data: FeedResponseDto;
  onDelete?: () => void; 
  onUpdate?: (postId: string, newContent: string) => void;
}

interface UserDetail {
  bio: string | null;
  createdAt: string;
  email: string;
  followerCount: string;
  followingCount: string;
  posts: string;
  profileimg: string;
  updatedAt: string;
  username: string;
}


const Post: React.FC<PostProps> = ({ data, onDelete, onUpdate }) => {
  const [postData, setPostData] = useState(data);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null); // 삭제할 댓글 ID
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const { author, userData } = useAuthorData(data);
  const { getLoginUser } = useLoginUser();
  
  useEffect(() => {
    setPostData(data); // ✅ prop 변경 시 state 동기화
    console.log("Post 컴포넌트 렌더링", data);
  }, [data]);

  const handleDelete = async () => {
    await deletePostById(data.postId);
    handleMenuClose();
    if (onDelete) onDelete();   
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    await createComment(data.postId.toString(), getLoginUser().id, comment);
    setComment("");
    loadComments(); // 댓글 새로고침
  };

  const loadComments = async () => {
    const res = await fetchCommentsByPostId(data.postId.toString());
    setComments(res);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (postData && postData.postId) {
        const res = await fetchCommentsByPostId(postData.postId.toString());
        setComments(res);
      }
    };
    fetchComments();
  }, [postData]);

  const confirmDeleteComment = async () => {
    if (deleteTargetId) {
      await deleteComment(deleteTargetId, getLoginUser().id);
      setDeleteTargetId(null);
      loadComments();
    }
  };

  const handleEditSubmit = async (newContent: string) => {
    const success = await updatePostContent(postData.postId.toString(), newContent);
    if (success) {
      setPostData((prev) => ({
        ...prev,
        content: newContent,
      }));

      onUpdate?.(postData.postId.toString(), newContent);
    }
  };

  


  return (
    <div className="post-wrapper">
      {/* 이미지 */}
      <div className="post-image">
        <Contents content={postData.content} image={postData.mediaUrl} />
      </div>

      {/* 우측 상세 */}
      <div className="post-details">
        {/* 헤더 */}
        <div className="post-header">
          <div className="profile-pic">
          <ProfilePicture profileImageUrl={userData?.profileimg ?? defaultProfileImg} username={userData?.username ?? "Unknown User"} size={30}/>
          </div>
          <span className="username">{userData?.username}</span>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
  {/* 🔐 삭제/수정 버튼은 작성자일 경우만 노출 */}
  {Number(author) === Number(getLoginUser().id) && (
    <>
      <MenuItem onClick={handleDelete} style={{ color: "red" }}>삭제</MenuItem>
      <MenuItem
        onClick={() => {
          setEditOpen(true);
          handleMenuClose();
        }}
      >
        수정
      </MenuItem>
    </>
  )}
</Menu>
        </div>

        {/* 본문 */}
        <div className="post-body">
          <p className="post-caption">
            <strong>{userData?.username}</strong> {postData.content}
          </p>
        </div>

        {/* 댓글 목록 */}
        <div className="comment-section">
          {comments.map((c) => (
            <div key={c.id} className="comment-item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <strong>{c.username}:</strong> {c.content}
              </div>
              {Number(c.userId) === Number(getLoginUser().id) &&  (
                <IconButton onClick={() => setDeleteTargetId(c.id)} size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      {/* 🔥  좋아요 개수 표시 */}
        <div style={{ fontWeight: 500, marginTop: "1rem" }}>
        <LikeButton postId={postData.postId.toString()} column={false} />
        </div>
        {/* 댓글 입력 */}
        <div style={{ marginTop: "auto" }}>
          <TextField
            fullWidth
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleCommentSubmit} variant="contained" sx={{ mt: 1 }}>
            게시
          </Button>
        </div>
      </div>

      {/* ✅ 삭제 확인 다이얼로그 */}
      <Dialog open={!!deleteTargetId} onClose={() => setDeleteTargetId(null)}>
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>댓글을 삭제하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTargetId(null)}>취소</Button>
          <Button onClick={confirmDeleteComment} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>

      {/* ✅ 게시물 수정 다이얼로그 */}
      {editOpen && (
        <EditPostDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialContent={postData.content}
      />   
      )}
    </div>
  );
};

export default Post;
