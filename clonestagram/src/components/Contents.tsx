import "/src/styles/styles.css";

interface ContentsProps {
  content?: string;
  image?: string;
}

const Contents: React.FC<ContentsProps> = ({ content = "", image }) => {
  const isVideo = (url: string) => {
    return /\.(mp4|webm|mov)$/i.test(url);
  };

  return (
    <div className="contents">
      {/* 텍스트 콘텐츠 */}
      {content.trim() && <p>{content}</p>}

      {/* 이미지 또는 비디오 콘텐츠 */}
      {image &&
        (isVideo(image) ? (
          <video
            src={image}
            className="post-image"
            controls
            muted
            playsInline
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        ) : (
          <img
            src={image}
            alt="Post"
            className="post-image"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        ))}
    </div>
  );
};

export default Contents;
