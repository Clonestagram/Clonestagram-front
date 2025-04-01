import { useEffect, useState } from "react";
import { fetchUserData } from "../api/fetchUserData";
import { FeedResponseDto } from "../api/fetchFeedAPI";
import { LoginUser } from "../data/loginUser";

export const useAuthorData = (data: FeedResponseDto) => {
  const [author, setAuthor] = useState<string>(data.authorId || data.viewerId);
  const [userData, setUserData] = useState<LoginUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = data.authorId || data.viewerId;
      if (!userId) return;

      try {
        const user = await fetchUserData(userId);
        setUserData(user);
        setAuthor(userId);
        console.log("👤 사용자 정보 불러옴:", user);
      } catch (error) {
        console.error("❌ 사용자 정보 로드 실패:", error);
      }
    };

    fetchUser();
  }, [data.authorId, data.viewerId]);

  return { author, userData };
};
