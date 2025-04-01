// src/recoil/likeCountState.ts
import { atomFamily } from "recoil";

export const likeCountState = atomFamily<number, string>({
  key: "likeCountState",
  default: 0,
});