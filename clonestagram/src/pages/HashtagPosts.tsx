import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchPostByHashtags} from "../api/fetchHashtagAPI";
import "/src/styles/styles.css";
import PostBox from "../components/PostBox";
import { FeedResponseDto } from "../api/fetchFeedAPI";

// interface Post {
//   id: string;
//   content: string;
//   mediaName: string;
//   contentType: string;
//   createdAt: string;
// }

// const dummyPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

const HashtagPosts = () => {
  const { tag } = useParams();
  const [filteredPosts, setFilteredPosts] = useState<FeedResponseDto[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      if (tag) {
        const postdata = await fetchPostByHashtags(tag);
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
          <PostBox key={post.postId} data={post} />
        ))}
      </div>
      )}
    </div>
  );
};

export default HashtagPosts;
