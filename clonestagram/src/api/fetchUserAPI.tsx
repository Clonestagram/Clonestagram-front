export const updateUserProfile = async (formData: FormData, userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`http://localhost:8080/${userId}/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (!res.ok) throw new Error("❌ 프로필 업데이트 실패");
  
      console.log("✅ 프로필 업데이트 성공");
      return true;
    } catch (err) {
      console.error("❌ 프로필 업데이트 오류:", err);
      return false;
    }
  };
  