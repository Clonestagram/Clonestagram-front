import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  content: string;
  fileName: string;
  mediaPath: string;
  type: "image" | "video";
  filter: string;
  hashtags?: string[];
}

const dummyPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

const HashtagPosts = () => {
  const { tag } = useParams();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const matched = dummyPosts.filter(post =>
      post.content.includes(`#${tag}`) || post.hashtags?.includes(`#${tag}`)
    );
    setFilteredPosts(matched);
  }, [tag]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>#{tag} 관련 게시물</h2>
      {filteredPosts.length === 0 ? (
        <p>관련 게시물이 없습니다.</p>
      ) : (
        <div className="hashtag-post-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="hashtag-post-item">
              {post.type === "image" ? (
                <img
                  src={localStorage.getItem(post.mediaPath) || post.mediaPath}
                  alt={post.content}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : (
                <video
                  src={localStorage.getItem(post.mediaPath) || post.mediaPath}
                  controls
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <p style={{ marginTop: "8px", fontSize: "14px" }}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HashtagPosts;
