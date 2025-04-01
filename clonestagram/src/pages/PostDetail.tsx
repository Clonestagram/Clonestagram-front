
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();

  return (
    <div>
      <h1>게시물 상세보기</h1>
      <p>게시물 ID: {postId}</p>
    </div>
  );
}
