import CommentSection from "./CommentSection";
import "/src/styles/styles.css";
import { FeedData } from "../data/feedData";

interface PostProps {
  postId: number;
  data: FeedData; // ✅ data를 props로 받아옴
}

const Post: React.FC<PostProps> = ({ postId, data }) => { // ✅ props에서 data를 구조 분해 할당
  return (
    <div className="post">
      <h3>게시물 상세 정보</h3>
      <p><strong>게시물 ID:</strong> {postId}</p>
      <p><strong>작성자:</strong> {data.username}</p>
      <p><strong>내용:</strong> {data.content}</p>

      {/* 댓글 섹션 */}
      <CommentSection 
        comments={Array.from({ length: data.comments }, (_, i) => ({
          username: `user${i + 1}`,
          text: `댓글 ${i + 1}`,
        }))} 
      />
    </div>
  );
};

export default Post;
