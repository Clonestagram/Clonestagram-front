import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/styles/styles.css";
import { fetchUserData } from "../api/fetchUserData";

interface ProfilePictureProps {
  userId: String;
  profileImageUrl: string;
  username: string;
  size?: number; // 기본값은 40px
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}


const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userId,
  username,
  profileImageUrl,
  size = 40,
  alt = "프로필 사진",
  onClick,
}) => {

  return (
    <Link to={`/${username}/`} onClick={onClick}>
      <img
        src={profileImageUrl|| "/default-profile.png"}
        alt={alt}
        className="profile-picture"
        style={{ width: size, height: size }}
      />
    </Link>
  );
};

export default ProfilePicture;
