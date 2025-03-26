// cloudinaryUpload.ts

/**
 * Cloudinary를 통해 이미지를 업로드하고 외부 URL을 반환하는 함수
 */

export const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const CLOUD_NAME = "deggvyhsw";
    const UPLOAD_PRESET = "clonestagram"; // 미리 Cloudinary 대시보드에서 생성해야 함
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        console.error("❌ Cloudinary 업로드 실패", res.statusText);
        return null;
      }
  
      const data = await res.json();
      console.log("✅ Cloudinary 업로드 성공:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("❌ Cloudinary 업로드 중 예외 발생:", error);
      return null;
    }
  };
  