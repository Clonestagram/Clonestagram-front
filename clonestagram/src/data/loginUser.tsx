// src/data/loginUser.ts

import { fetchFollowingList } from "../api/fetchFollowState";
import { fetchUserData } from "../api/fetchUserData";

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

let currentUser: LoginUser | null = null;

/**
 * 유저 ID로 전체 로그인 유저 정보 설정
 */
export const setLoginUserById = async (id: string): Promise<void> => {
  try {
    const user = await fetchUserData(id); // 🔹 id 기반 유저 정보 조회
    const followingList = await fetchFollowingList(id); // 🔹 팔로우 목록 조회

    currentUser = {
      ...user,
      id: id,
      followingUserIds: followingList,
    };

    console.log("✅ 로그인 유저 정보 설정 완료:", currentUser);
  } catch (err) {
    console.error("❌ 로그인 유저 설정 실패:", err);
    throw new Error("로그인 유저 설정 중 오류 발생");
  }
};

/**
 * 이미 유저 데이터를 알고 있을 때 직접 세팅
 */
export const setLoginUser = async (user: Omit<LoginUser, "followingUserIds">) => {
  const followingList = await fetchFollowingList(user.id);
  currentUser = {
    ...user,
    followingUserIds: followingList,
  };
};

/**
 * 로그인 유저 정보 가져오기
 */
const getLoginUser = (): LoginUser => {
  if (!currentUser) {
    throw new Error("⛔ 로그인 유저가 설정되지 않았습니다.");
  }
  return currentUser;
};

export default getLoginUser;
