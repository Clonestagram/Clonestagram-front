import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../api/fetchUserPosts";
import { fetchUserData } from "../api/fetchUserData";
import PostBox from "../components/PostBox";
import "/src/styles/styles.css";
import { useParams } from "react-router-dom";
import { fetchUserId } from "../api/fetchUserId";
import getLoginUser from "../data/loginUser";
import { fetchFollowingList, fetchFollowState } from "../api/fetchFollowState";
import { FeedResponseDto } from "../api/fetchFeedAPI";
import FollowerDialog from "../components/FollowerDialog";
import { fetchFollowersByUserId, fetchFollowingsByUserId } from "../api/fetchFollowList";

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
  const { name } = useParams();
  const [profileUser, setProfileUser] = useState<String>(getLoginUser().id);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const isOwnProfile = getLoginUser().username === name;
  const followingList = getLoginUser().followingUserIds;
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [posts, setPosts] = useState<FeedResponseDto[]>([]);
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
  
  const handleFollowClick = async () => {
    const prevIsFollowing = isFollowing;
    const success = await fetchFollowState(getLoginUser().id, profileUser);
  
    if (success) {
      const newFollowerCount = prevIsFollowing
        ? Number(userData.followerCount) - 1
        : Number(userData.followerCount) + 1;
  
      setIsFollowing(!prevIsFollowing); // 상태 토글
      console.log("🔁 팔로우 상태 변경:", !prevIsFollowing);
      setUserData((prev) => ({
        ...prev,
        followerCount: newFollowerCount.toString(), // 숫자 → 문자열로 변환
      }));
    }
  };
  

  useEffect(() => {
    const fetchAll = async () => {
      let userId = getLoginUser().id;
  
      // 1. 로그인 유저와 다른 프로필 유저일 경우, uid 조회
      if (name && getLoginUser().username !== name) {
        const uid = await fetchUserId(name);
        console.log("✅ uid:", uid);
        if (!uid) return;
        setProfileUser(uid); // 상태 저장
        userId = uid;         // 이후 요청에 사용
      } else {
        setProfileUser(userId);
      }
  
      // 2. 사용자 정보 로딩
      const user = await fetchUserData(userId);
      console.log("✅ user:", user);
      if (user) setUserData(user);
  
      // 3. 게시글 로딩
      const data = await fetchUserPosts(userId);
      if (data) {
        const enrichedData = data.map((item) => ({
          ...item,
          authorId: userId, // 🔥 authorId 필드 추가
        }));
        setPosts(enrichedData);
      }

    };
  
    fetchAll();
  }, [name]);
  
  useEffect(() => {
    console.log("🔥 posts 리스트:", posts);
  }, [posts]);

  const handleDeletePost = (deletedPostId: string) => {
    setPosts((prev) => prev.filter((p) => p.postId !== deletedPostId));
  };

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
          {!isOwnProfile && (
            <button
            className={`follow-button ${isFollowing ? "following" : ""}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
          )}
          
          <div className="profile-stats">
            <span>게시물 {posts.length}</span>
            <div className="profile-stats">
              <span onClick={() => setFollowerOpen(true)} style={{ cursor: "pointer" }}>
                팔로워 {userData.followerCount}
              </span>
              <span onClick={() => setFollowingOpen(true)} style={{ cursor: "pointer" }}>
                팔로우 {userData.followingCount}
              </span>
            </div>
          </div>
          <p className="profile-bio">{userData.bio}</p>
        </div>
      </div>
      <div className="profile-post-container">
      <div className="profile-post-grid">
        {posts.map((post) => (
           <PostBox key={post.postId} data={post} onDelete={() => handleDeletePost(post.postId)} />
        ))}
      </div>
      </div>
      <FollowerDialog
  open={followerOpen}
  onClose={() => setFollowerOpen(false)}
  title="팔로워"
  fetchFn={() => fetchFollowersByUserId(profileUser.toString())}
  onCountChange={(delta, type) => {
    if (type === "follower") {
      setUserData((prev) => ({
        ...prev,
        followerCount: (Number(prev.followerCount) + delta).toString(),
      }));
    }
  }}
/>

<FollowerDialog
  open={followingOpen}
  onClose={() => setFollowingOpen(false)}
  title="팔로잉"
  fetchFn={() => fetchFollowingsByUserId(profileUser.toString())}
  onCountChange={(delta, type) => {
    if (type === "following") {
      setUserData((prev) => ({
        ...prev,
        followingCount: (Number(prev.followingCount) + delta).toString(),
      }));
    }
  }}
/>
    </div>

    
  );
};

export default Profile;
