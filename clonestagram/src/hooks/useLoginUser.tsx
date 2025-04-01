import { useRecoilState } from 'recoil';
import { loginUserState } from '../recoil/loginUserAtom';
import { fetchUserData } from '../api/fetchUserData';
import { fetchFollowingList } from '../api/fetchFollowState';
import { LoginUser } from '../data/loginUser';

export const useLoginUser = () => {
  const [loginUser, setLoginUserState] = useRecoilState(loginUserState);

  /**
   * 유저 ID로 전체 로그인 유저 정보 설정
   */
  const setLoginUserById = async (id: string): Promise<void> => {
    try {
      const user = await fetchUserData(id);
      const followingList = await fetchFollowingList(id);

      const completeUser: LoginUser = {
        ...user,
        id,
        followingUserIds: followingList,
      };

      setLoginUserState(completeUser);
      console.log("✅ 로그인 유저 정보 설정 완료:", completeUser);
    } catch (err) {
      console.error("❌ 로그인 유저 설정 실패:", err);
      throw new Error("로그인 유저 설정 중 오류 발생");
    }
  };

  /**
   * 이미 유저 데이터를 알고 있을 때 직접 세팅
   */
  const setLoginUser = async (user: Omit<LoginUser, "followingUserIds">) => {
    const followingList = await fetchFollowingList(user.id);
    setLoginUserState({
      ...user,
      followingUserIds: followingList,
    });
  };

  /**
   * 로그인 유저 정보 가져오기 (null 체크 포함)
   */
  const getLoginUser = (): LoginUser => {
    if (!loginUser) {
      throw new Error("⛔ 로그인 유저가 설정되지 않았습니다.");
    }
    return loginUser;
  };

  const toggleFollowInRecoil = (targetUserId: string, isNowFollowing: boolean) => {
    setLoginUserState((prev) => {
      if (!prev) return prev;

      const updatedFollowings = isNowFollowing
        ? [...prev.followingUserIds, targetUserId]
        : prev.followingUserIds.filter((id) => id !== targetUserId);

      return {
        ...prev,
        followingUserIds: updatedFollowings,
      };
    });
  };

  return {
    loginUser,
    setLoginUserById,
    setLoginUser,
    getLoginUser,
    toggleFollowInRecoil,
  };
};


