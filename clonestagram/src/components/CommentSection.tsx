import "/src/styles/styles.css";

interface Comment {
  username: string;
  text: string;
}

interface CommentSectionProps {
  comments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments = [] }) => {
  return (
    <div className="comment-section">
      <h4>댓글</h4>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))
      )}
    </div>
  );
};

export default CommentSection;
