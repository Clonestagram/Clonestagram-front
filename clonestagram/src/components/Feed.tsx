import Post from "./Post";
import "/src/styles/styles.css";

const Feed = () => {
    return (
      <div className="feed">
        <h2>피드</h2>
        <Post />
      </div>
    );
  };

export default Feed;