import React from "react";
import "/src/styles/styles.css";

interface PostBoxProps {
  key : number;
  mediaUrl: string;
}

const PostBox: React.FC<PostBoxProps> = ({ mediaUrl }) => {
  console.log("✅ 미디어 경로 확인:", mediaUrl);

  const isVideo = (url: string): boolean => {
    return /\.(mp4|mov|webm)$/i.test(url) || url.toLowerCase().includes("video");
  };
  
  const thumbnailUrl = isVideo(mediaUrl)
    ? mediaUrl
        .replace("/upload/", "/upload/so_1,w_400,h_300,c_fill/")
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : mediaUrl;
  

  return (
    <div className="post-thumbnail">
      {isVideo(mediaUrl) ? (
        <video
        src={mediaUrl}
        className="post-media"
        preload={thumbnailUrl}
        muted
        controls={false}
        onClick={(e) => e.currentTarget.play()} // 클릭 시 재생하게 할 수도 있음
      />
      ) : (
        <img src={mediaUrl} alt="post" className="post-media" />
      )}
      {/* 확인용 출력 */}
      {/* <p>{mediaUrl}</p> */}
    </div>
  );
};

export default PostBox;
