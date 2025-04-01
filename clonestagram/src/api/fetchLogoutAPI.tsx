export const fetchLogout = async (): Promise<void> => {
  const res = await fetch("http://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
    redirect: "manual", // ✅ 리디렉션 수동 처리
  });

  if (res.status !== 200 && res.status !== 302) {
    throw new Error("❌ 로그아웃 실패");
  }
};