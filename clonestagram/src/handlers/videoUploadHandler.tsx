// handlers/videoUploadHandler.ts
import { getNextIndex } from "../utils/storage";

export const handleVideoSubmit = (
  file: File,
  caption: string,
  filter: string,
  onSuccess: () => void
) => {
  const index = Date.now(); // 시간 기반 ID
  const videoURL = URL.createObjectURL(file); // base64 ❌ 대신 미리보기 URL 🎯

  const dummyPost = {
    id: index,
    content: caption,
    fileName: file.name,
    mediaPath: videoURL,
    type: "video",
    filter,
  };

  const existing = JSON.parse(localStorage.getItem("posts") || "[]");
  existing.push(dummyPost);
  localStorage.setItem("posts", JSON.stringify(existing));

  onSuccess();
};

