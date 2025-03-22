import "/src/styles/styles.css";

interface ContentsProps {
  content?: string; // 추가: 게시물 내용
  image?: string; // 기존: 이미지
}

const Contents: React.FC<ContentsProps> = ({ content = "", image }) => {
  return (
    <div className="contents">
      <p>{content}</p> {/* 게시물 텍스트 */}
      {image && <img src={image} alt="Post" className="post-image" />}
    </div>
  );
};

export default Contents;
