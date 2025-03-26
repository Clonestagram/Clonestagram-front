// handlers/imageUploadHandler.ts
import { getNextIndex, saveBlobToFile } from "../utils/storage";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

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
  img.crossOrigin = "anonymous"; // 크로스 도메인 문제 방지
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
        console.error("❌ Blob is null");
        return;
      }

      const index = getNextIndex("image");
      let filename = "";


      try {
        const url = await uploadToCloudinary(file);
        if (url) {
          console.log("✅ Cloudinary 업로드 완료 URL:", url);
        }

        filename = url ? url : `image-${index}.png`;


        console.log("📸 이미지 파일 생성 완료:", filename);

        // 🟡 서버 전송 시도
        const formData = new FormData();
        formData.append("file", filename);
        formData.append("content", caption);

        // formData.append("hashTagList", JSON.stringify([]));

        console.log("🚀 서버로 POST 요청 전송 중...");

        const response = await fetch("http://localhost:8080/image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`❌ 서버 응답 오류: ${response.status}`);
        }

        console.log("✅ 서버 업로드 성공");

        // 🔵 로컬 저장
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

        console.log("📦 로컬스토리지 저장 완료:", dummyPost);
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
