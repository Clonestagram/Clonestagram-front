// handlers/imageUploadHandler.ts
import { extractHashtags } from "../utils/extractHashtags";
import { getNextIndex } from "../utils/storage";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export const handleImageSubmit = async (
  file: File,
  imageURL: string,
  canvas: HTMLCanvasElement,
  filter: string,
  caption: string,
  loginUserId: string,
  onSuccess: () => void,
  setTrigger: React.Dispatch<React.SetStateAction<number>> // 🔥 상태 변경 함수만 인자로 받기
) => {
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageURL;

  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    if (ctx) {
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
    } else {
      console.error("❌ 2D context를 가져오지 못했습니다.");
      return;
    }

    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("이미지 변환 실패: blob이 null입니다.");
        return;
      }

      const index = getNextIndex("image");
      let filename = "";

      try {
        const url = await uploadToCloudinary(file, "image");
        filename = url || `image-${index}.png`;

        console.log("📸 업로드 파일명:", filename);

        const hashtags = extractHashtags(caption);
        const payload = {
          file: filename,
          content: caption,
          hashTagList: hashtags,
        };

        const response = await fetch(`http://localhost:8080/image?userId=${loginUserId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`❌ 서버 응답 오류: ${response.status}`);
        }

        console.log("✅ 서버 업로드 성공");
        setTrigger((prev) => prev + 1); // ✅ 외부에서 받은 상태 변경 함수 사용
        onSuccess();
      } catch (err) {
        alert("업로드 중 오류가 발생했습니다.");
        console.error("❌ 업로드 실패:", err);
      }
    }, "image/png");
  };

  img.onerror = () => {
    alert("이미지 로딩에 실패했습니다.");
    console.error("❌ 이미지 로딩 실패");
  };
};
