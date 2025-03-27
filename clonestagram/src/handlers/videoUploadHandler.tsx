// handlers/videoUploadHandler.ts
import { extractHashtags } from "../utils/extractHashtags";
import { getNextIndex } from "../utils/storage";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export const handleVideoSubmit = async (
  file: File,
  caption: string,
  filter: string,
  onSuccess: () => void
) => {

  const index = getNextIndex("image");
  let filename = "";

 try {
         const url = await uploadToCloudinary(file, "video");
         if (url) {
           console.log("✅ Cloudinary 업로드 완료 URL:", url);
         }
 
         filename = url ? url : `video-${index}.mp4`;
 
 
         console.log("📸 이미지 파일 생성 완료:", filename);
 
 
         const hashtags = extractHashtags(caption);
         // 🟡 서버 전송 시도
         const payload = {
           file: filename, // Cloudinary URL
           content: caption,
           hashTagList: hashtags
         };
 
         // formData.append("hashTagList", JSON.stringify([]));
 
         console.log("🚀 서버로 POST 요청 전송 중...");
 
         const response = await fetch("http://localhost:8080/video", {
           method: "POST",
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify(payload)
         });
 
         if (!response.ok) {
           throw new Error(`❌ 서버 응답 오류: ${response.status}`);
         }
 
         console.log("✅ 서버 업로드 성공");
 
         onSuccess();
       } catch (err) {
         alert("업로드 중 오류가 발생했습니다.");
         console.error("❌ 업로드 실패:", err);
       }
    
   };
 


