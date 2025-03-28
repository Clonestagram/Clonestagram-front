// 타입 정의
export interface FollowDto {
    id: string;
    fromUserId: string;
    toUserId: string;
    fromUsername: string;
    toUsername: string;
    fromProfileimg: string;
    toProfileImg: string;
    createdAt: string;
  }
  
  // API 요청 후 처리
  export const fetchFollowersByUserId = async (userId: string): Promise<FollowDto[]> => {
    const res = await fetch(`http://localhost:8080/follow/${userId}/profile/followers`);
    const data = await res.json();
  
    // 👉 숫자 ID들을 문자열로 변환
    const normalized = data.map((item: any) => ({
      ...item,
      id: String(item.id),
      fromUserId: String(item.fromUserId),
      toUserId: String(item.toUserId),
    }));

    console.log("👉 팔로워 목록 조회 결과:", normalized);
  
    return normalized;
  };
  
  
  export const fetchFollowingsByUserId = async (userId: string) => {
    const res = await fetch(`http://localhost:8080/follow/${userId}/profile/following`);
    const data = await res.json();

    const normalized = data.map((item: any) => ({
        ...item,
        id: String(item.id),
        fromUserId: String(item.fromUserId),
        toUserId: String(item.toUserId),
      }));

    console.log("👉 팔로잉 목록 조회 결과:", normalized);

      return normalized;
  };
  