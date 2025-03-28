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

import { FeedResponseDto } from "../api/fetchFeedAPI";
import Contents from "./Contents";
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  PostComment,
} from "../api/fetchCommentAPI";
import getLoginUser from "../data/loginUser";
import { deletePostById } from "../api/fetchPostAPI";
import Profile from "../pages/Profile";
import ProfilePicture from "./ProfilePicture";
import { fetchUserData } from "../api/fetchUserData";
import LikeButton from "./LikeButton";

interface PostProps {
  data: FeedResponseDto;
  onDelete?: () => void; 
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


const Post: React.FC<PostProps> = ({ data, onDelete }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDetail>();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null); // 삭제할 댓글 ID
  const [author, setAuthor] = useState<string>("");
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

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
    logCommentOwnership(res);
  };

  const confirmDeleteComment = async () => {
    if (deleteTargetId) {
      await deleteComment(deleteTargetId, getLoginUser().id);
      setDeleteTargetId(null);
      loadComments();
    }
  };

    useEffect(() => {
      const fetchUser = async () => {
        if (data.authorId) {
          const user = await fetchUserData(data.authorId);
          if (user) setUserData(user);
          console.log("👤 사용자 정보:", data.authorId);
          setAuthor(data.authorId);
        }else{
          setAuthor(data.viewerId);
        }
      }
      fetchUser();
    }, [data.authorId]);
    
    const handleEditSubmit = (newContent: string) => {
      console.log("📝 수정할 내용:", newContent);
      // → 실제 게시물 수정 API 호출 후 상태 업데이트
    };



  

  const logCommentOwnership = (comments: PostComment[]) => {
    const loginUserId = getLoginUser().id;
    comments.forEach((comment) => {
      const isOwner = comment.userId === loginUserId;
      console.log(
        `[비교 검사] comment.userId: (${typeof comment.userId}) ${comment.userId} | loginUser.id: (${typeof loginUserId}) ${loginUserId}`
      );
    });
  };


  return (
    <div className="post-wrapper">
      {/* 이미지 */}
      <div className="post-image">
        <Contents content={data.content} image={data.mediaUrl} />
      </div>

      {/* 우측 상세 */}
      <div className="post-details">
        {/* 헤더 */}
        <div className="post-header">
          <div className="profile-pic">
          <ProfilePicture userId={author} profileImageUrl={userData?.profileimg || ""} username={data.username} size={30}/>
          </div>
          <span className="username">{data.username}</span>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleDelete} style={{ color: "red" }}>삭제</MenuItem>
            <MenuItem onClick={() => {
              setEditOpen(true);
              handleMenuClose();
            }}>수정</MenuItem>
          </Menu>
        </div>

        {/* 본문 */}
        <div className="post-body">
          <p className="post-caption">
            <strong>{data.username}</strong> {data.content}
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
        <LikeButton postId={data.postId.toString()} column={false} />
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
        initialContent={data.content}
      />   
      )}
    </div>
  );
};

export default Post;
