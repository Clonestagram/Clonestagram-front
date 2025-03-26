import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../api/fetchUserPosts";
import { fetchUserData } from "../api/fetchUserData";
import PostBox from "../components/PostBox";
import "/src/styles/styles.css";

interface PostType {
  id: number;
  content: string;
  mediaName: string;
  contentType: string;
  createdAt: string;
}

interface UserDetail {
  bio: string | null;
  createdAt: string;
  email: string;
  followerCount: string;
  followingCount: string;
  posts: string;
  profileimg: string;
  updatedAt: string;
  username: string;
}

const Profile: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [userData, setUserData] = useState<UserDetail>({
    bio: null,
    createdAt: "",
    email: "",
    followerCount: "",
    followingCount: "",
    posts: "",
    profileimg: "",
    updatedAt: "",
    username: "",
  });
  useEffect(() => {
    const loadPosts = async () => {
      const user = await fetchUserData();
      console.log("✅ user:", user);
      if (user) {
        setUserData(user);
      }
    };

    const loadUser = async () => {
      const data = await fetchUserPosts();
      if (data && data.feed.content) {
        setPosts(data.feed.content);
      }
    };

    loadPosts();
    loadUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.profileimg}
          alt="profile"
          className="profile-img"
        />
        <div className="profile-info">
          <h2 className="username">{userData.username}</h2>
          <div className="profile-stats">
            <span>게시물 {posts.length}</span>
            <span>팔로워 {userData.followerCount}</span>
            <span>팔로우 {userData.followingCount}</span>
          </div>
        </div>
      </div>
      <div className="profile-post-container">
      <div className="profile-post-grid">
        {posts.map((post) => (
          <PostBox key={post.id} imageUrl={post.mediaName} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Profile;
