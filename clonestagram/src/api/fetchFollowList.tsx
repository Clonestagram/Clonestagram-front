// src/api/fetchFollowList.ts

export interface FollowDto {
  userId: string;
  followerId: string;
  followedId: string;
  followerName: string;
  followedName: string;
  followerProfileimg: string;
  followedProfileImg: string;
  createdAt: string;
}

export const fetchFollowersByUserId = async (userId: string): Promise<FollowDto[]> => {
  const res = await fetch(`http://localhost:8080/follow/${userId}/profile/followers`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("📥 팔로워 목록 조회 결과:", data);

  const normalized = data.map((item: any) => ({
    ...item,
    userId: String(item.id),
    followerId: String(item.followerId),
    followedId: String(item.followedId),
  }));

  console.log("👉 변환된 팔로워 목록:", normalized);

  return normalized;
};
export const fetchFollowingsByUserId = async (userId: string): Promise<FollowDto[]> => {
  const res = await fetch(`http://localhost:8080/follow/${userId}/profile/following`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("📥 팔로잉 목록 조회 결과:", data);

  // 필드명 매핑 수정
  const normalized = data.map((item: any) => ({
    userId: String(item.id),
    followerId: String(item.followerId),
    followedId: String(item.followedId),
    followerName: item.followerName,
    followedName: item.followedName,
    followerProfileimg: item.followerProfileimg,
    followedProfileImg: item.followedProfileImg,
    createdAt: item.createdAt,
  }));

  console.log("👉 팔로잉 목록 정제 결과:", normalized);
  return normalized;
};
