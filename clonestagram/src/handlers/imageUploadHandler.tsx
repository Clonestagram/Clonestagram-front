// handlers/imageUploadHandler.ts
import { getNextIndex, saveBlobToFile } from "../utils/storage";

export const handleImageSubmit = async (
  file: File,
  imageURL: string,
  canvas: HTMLCanvasElement,
  filter: string,
  caption: string,
  onSuccess: () => void
) => {
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imageURL;

  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx!.filter = filter;
    ctx!.drawImage(img, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("이미지 변환 실패: blob이 null입니다.");
        return;
      }

      try {
        const index = getNextIndex("image");
        const filename = `image-${index}.png`;
        const imagePath = await saveBlobToFile(blob, filename, "data/postImage");

        const dummyPost = {
          id: Date.now(),
          content: caption,
          fileName: filename,
          mediaPath: imagePath,
          type: "image",
          filter,
        };

        const existing = JSON.parse(localStorage.getItem("posts") || "[]");
        existing.push(dummyPost);
        localStorage.setItem("posts", JSON.stringify(existing));

        onSuccess();
      } catch (err) {
        alert("업로드 중 오류가 발생했습니다.");
        console.error(err);
      }
    }, "image/png");
  };

  img.onerror = () => {
    alert("이미지 로딩에 실패했습니다.");
    console.error("❌ 이미지 로딩 실패");
  };
};
