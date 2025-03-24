import React from "react";
import CommentSection from "./CommentSection";
import "/src/styles/styles.css";
import { FeedData } from "../data/feedData";
import Contents from "./Contents";

interface PostProps {
  postId: number;
  data: FeedData;
}

const Post: React.FC<PostProps> = ({ postId, data }) => {
  return (
    <div className="post-wrapper">
      {/* 왼쪽: 이미지 */}
      <div className="post-image">
        <Contents content={data.content} image={data.image} />
      </div>

      {/* 오른쪽: 작성자, 본문, 댓글 */}
      <div className="post-details">
        <div className="post-header">
          <div className="profile-pic" />
          <span className="username">{data.username}</span>
        </div>

        <div className="post-body">
          <p className="post-caption"><strong>{data.username}</strong> {data.content}</p>
        </div>

        <CommentSection
          comments={Array.from({ length: data.comments }, (_, i) => ({
            username: `user${i + 1}`,
            text: `댓글 ${i + 1}`,
          }))}
        />
      </div>
    </div>
  );
};

export default Post;
