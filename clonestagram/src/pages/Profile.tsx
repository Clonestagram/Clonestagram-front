import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "/src/styles/styles.css";

import { fetchUserPosts } from "../api/fetchUserPosts";
import { fetchUserData } from "../api/fetchUserData";
import { fetchFollowersByUserId, fetchFollowingsByUserId } from "../api/fetchFollowList";
import { fetchFollowState } from "../api/fetchFollowState";
import { fetchUserId } from "../api/fetchUserId";
import PostBox from "../components/PostBox";
import FollowerDialog from "../components/FollowerDialog";

import defaultProfileImg from "/public/profileImg.jpg";
import { useLoginUser } from "../hooks/useLoginUser";
import { FeedResponseDto } from "../api/fetchFeedAPI";
import { useRecoilValue } from "recoil";
import { uploadTriggerState } from "../recoil/uploadTriggerAtom";

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
  const trigger = useRecoilValue(uploadTriggerState);
  const { name } = useParams();
  const navigate = useNavigate();
  const { getLoginUser, loginUser, toggleFollowInRecoil } = useLoginUser();
  const [profileUser, setProfileUser] = useState<string>(getLoginUser().id);
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

  const [posts, setPosts] = useState<FeedResponseDto[]>([]);
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const isOwnProfile = getLoginUser().username === name;
  const isFollowing = loginUser?.followingUserIds.includes(profileUser.toString());



  
  const handleFollowClick = async () => {
    const success = await fetchFollowState(getLoginUser().id, profileUser);
    const loginUser = getLoginUser();
    const prevIsFollowing = loginUser.followingUserIds.includes(profileUser.toString());
  
    if (success) {
      toggleFollowInRecoil(profileUser.toString(), !prevIsFollowing);
    }
  };

  const handleDeletePost = (deletedPostId: string) => {
    setPosts((prev) => prev.filter((p) => p.postId !== deletedPostId));
  };

  const fetchAll = async () => {
    let userId = getLoginUser().id;
    let targetId = userId;

    if (name && getLoginUser().username !== name) {
      const uid = await fetchUserId(name);
      if (!uid) return;
      targetId = uid;
    }

    setProfileUser(targetId);

    const user = await fetchUserData(targetId.toString());
    if (user) setUserData(user);

    const postData = await fetchUserPosts(targetId.toString());
    const enrichedPosts = postData.map((item) => ({
      ...item,
      authorId: userId,
    }));
    setPosts(enrichedPosts);

    const [followers, followings] = await Promise.all([
      fetchFollowersByUserId(targetId.toString()),
      fetchFollowingsByUserId(targetId.toString()),
    ]);
    setUserData((prev) => ({
      ...prev,
      followerCount: followers.length.toString(),
      followingCount: followings.length.toString(),
    }));
  };

  useEffect(() => {
    fetchAll();
  }, [name, trigger, getLoginUser().followingUserIds]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.profileimg || defaultProfileImg}
          alt="profile"
          className="profile-img"
        />
        <div className="profile-info">
          
        <div style={{ display: "flex", alignItems: "center", gap: "12px",  margin :"0px 20px" }}>
  <Typography variant="h6" fontWeight="medium">
    {userData.username}
  </Typography>
  {!isOwnProfile ? (
    <Button
      variant={isFollowing ? "outlined" : "contained"}
      color={isFollowing ? "primary" : "secondary"}
      size="small"
      onClick={handleFollowClick}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  ) : (
    <Button
      variant="outlined"
      size="small"
      onClick={() => navigate("/profile/edit")}
    >
      프로필 편집
    </Button>
  )}
</div>

          <div className="profile-stats">
            
          <div className="profile-stats" style={{ display: "flex", gap: "20px", margin :"20px" }}>
  <span>
    게시물 <strong>{posts.length}</strong>
  </span>
  <span
    onClick={() => setFollowerOpen(true)}
    style={{ cursor: "pointer" }}
  >
    팔로워 <strong>{userData.followerCount}</strong>
  </span>
  <span
    onClick={() => setFollowingOpen(true)}
    style={{ cursor: "pointer" }}
  >
    팔로우 <strong>{userData.followingCount}</strong>
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


