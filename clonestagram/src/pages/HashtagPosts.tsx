import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchPostbyHashtags} from "../api/fetchPostbyHashtags";
import "/src/styles/styles.css";
import PostBox from "../components/PostBox";

interface Post {
  id: number;
  content: string;
  mediaName: string;
  contentType: string;
  createdAt: string;
}

const dummyPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

const HashtagPosts = () => {
  const { tag } = useParams();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      if (tag) {
        const postdata = await fetchPostbyHashtags(tag);
        console.log("✅ postdata:", postdata);
        if (postdata) {
          setFilteredPosts(postdata);
        }
      } else {
        console.error("❌ Tag is undefined.");
      }
    };

    loadPosts();
  }, []);


  return (
    <div style={{ padding: "20px" }}>
      <h2>#{tag} 관련 게시물</h2>
      {filteredPosts.length === 0 ? (
        <p>관련 게시물이 없습니다.</p>
      ) : (
        <div className="profile-post-grid">
        {filteredPosts.map((post) => (
          <PostBox key={post.id} imageUrl={post.mediaName} />
        ))}
      </div>
      )}
    </div>
  );
};

export default HashtagPosts;
