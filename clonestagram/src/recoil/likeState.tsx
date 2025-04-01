import { atomFamily } from "recoil";

export const likeState = atomFamily<boolean, string>({
  key: "likeState",
  default: false,
});