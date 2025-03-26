import React from "react";
import "/src/styles/styles.css";

interface PostBoxProps {
  imageUrl: string;
}

const PostBox: React.FC<PostBoxProps> = ({ imageUrl }) => {
    console.log("✅ 이미지 경로 확인:", imageUrl);

  return (
    <div className="post-thumbnail">
      <img src={imageUrl} alt="post" className="post-image" />
      <p>{imageUrl}</p>
    </div>
  );
};

export default PostBox;
