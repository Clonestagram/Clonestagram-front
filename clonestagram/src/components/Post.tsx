import React from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import "/src/styles/styles.css";
import testImage1 from "/src/assets/testImage1.png";

const Post = () => {
  return (
    <div className="post">
      <h4>사용자 이름</h4>
      <img src={testImage1} alt="Post" className="post-image" />
      <LikeButton />
      <CommentSection />
    </div>
  );
};

export default Post;