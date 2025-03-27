export const fetchPostbyHashtags = async (tag :string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/search/tag?keyword=${encodeURIComponent(tag)}`
    );
    console.log("🚀 해시태그 검색 중...");
    const data = await response.json();
    const posts =data.content.content;
    console.log("✅ 검색 결과:", data);

    


    return posts;
    } catch (error) {
      console.error("❌ 해시태그 검색 실패:", error);
      return null;
    }
  };
