import React from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import "/src/styles/styles.css";

const Post = () => {
  return (
    <div className="post">
      <h4>사용자 이름</h4>
      <img src="https://via.placeholder.com/400" alt="Post" className="post-image" />
      <LikeButton />
      <CommentSection />
    </div>
  );
};

export default Post;