import { atom } from "recoil";

export const followingListState = atom<string[]>({
  key: "followingListState",
  default: [], // 유저 ID 목록 (string[])
});
