
export interface LoginUser {
  id: string;
  username: string;
  email: string;
  profileimg: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  posts: number;
  createdAt: string;
  updatedAt: string;
  followingUserIds: string[]; // ✅ 팔로우 중인 유저 ID들
}
