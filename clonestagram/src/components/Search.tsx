import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Hash } from "lucide-react";
import "/src/styles/styles.css";
import defaultProfileImg from "/public/profileImg.jpg"
interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  recentSearches: { username: string; displayName: string; image: string }[];
  removeItem: (username: string) => void;
  clearAll: () => void;
  onCloseSearch: () => void;
}

interface HashtagInfo {
  tagName: string;
  postCount: number;
}

interface UserSuggestionDto {
  id: number;
  profileimg : string;
  username: string;
}

const Search: React.FC<SearchProps> = ({
  search,
  setSearch,
  recentSearches,
  removeItem,
  clearAll,
  onCloseSearch,
}) => {
  const isHashtagSearch = search.startsWith("#");
  const [suggestions, setSuggestions] = useState<HashtagInfo[]>([]);


  const [userSuggestions, setUserSuggestions] = useState<UserSuggestionDto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHashtags = async () => {
      if (!isHashtagSearch || search.length < 2) return;

      try {
        const response = await fetch(
          `http://localhost:8080/search/tag/suggestions?keyword=${encodeURIComponent(search.replace("#", ""))}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setSuggestions(data || []);
        console.log("✅ 해시태그 제안 로딩 완료:", data);
      } catch (error) {
        console.error("❌ 해시태그 제안 로딩 실패:", error);
      }
    };

    fetchHashtags();
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (search && !isHashtagSearch && search.length >= 2) {
        try {
          const res = await fetch(
            `http://localhost:8080/search/user/suggestions?keyword=${encodeURIComponent(search)}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await res.json();
          setUserSuggestions(data || []);
          console.log("✅ 유저 검색 결과:", data);
        } catch (err) {
          console.error("❌ 유저 검색 실패:", err);
        }
      } else {
        setUserSuggestions([]);
      }
    };
    fetchUsers();
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isHashtagSearch) {
      handleHashtagClick(search.replace("#", ""));
    }
  };

  const handleHashtagClick = (tag: string) => {
    // setSearch("");
    // onCloseSearch();
    navigate(`/HashtagPosts/${encodeURIComponent(tag)}`);
  };

  return (
    <>
      <div className="search-input-wrapper">
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          {search && (
            <button onClick={() => setSearch("")} className="search-clear-btn">
              <X size={18} color="#888" />
            </button>
          )}
        </div>
      </div>
  
      {/* 🔍 검색어가 비어있는 경우 → 최근 검색 표시 */}
      {search.trim() === "" || search.length < 2 ? (
        <div className="search-history">
          <div className="search-history-header">
            <span style={{ fontWeight: "bold" }}>최근 검색 항목</span>
            <span
              onClick={clearAll}
              style={{ color: "#0095f6", fontSize: "14px", cursor: "pointer" }}
            >
              모두 지우기
            </span>
          </div>
          <div className="search-list">
            {recentSearches.map((user) => (
              <div className="search-item" key={user.username}>
                <Link
                  to={`/${user.username}/`}
                  className="unstyled-link"
                  onClick={onCloseSearch}
                  style={{ display: "flex", alignItems: "center", flex: 1 }}
                >
                  <img
                    src={user.image}
                    alt={`${user.username}의 프로필 이미지`}
                    className="profile-picture"
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                  <div
                    className="search-info"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="search-username" style={{ fontWeight: 600 }}>
                      {user.username}
                    </div>
                    <div
                      className="search-sub"
                      style={{ color: "#888", fontSize: "14px" }}
                    >
                      {user.displayName} · 팔로잉
                    </div>
                  </div>
                </Link>
                <X
                  size={20}
                  className="search-remove-btn"
                  style={{ cursor: "pointer", color: "#999", marginLeft: "auto" }}
                  onClick={() => removeItem(user.username)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : isHashtagSearch ? (
        // 🔎 해시태그 자동완성
        <div className="hashtag-list">
          {suggestions.length > 0 ? (
            suggestions.map((tag, index) => (
              <div
                key={index}
                className="hashtag-item"
                onClick={() => handleHashtagClick(tag.tagName)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="hashtag-circle">
                    <Hash size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>#{tag.tagName}</div>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      게시물 {formatPostCount(tag.postCount)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: "16px", color: "#888" }}>관련 해시태그 없음</p>
          )}
        </div>
      ) : (
        // 👤 유저 자동완성 (비슷한 방식으로 userSuggestions 배열 사용)
        <div className="search-list">
          {userSuggestions.length > 0 ? (
            userSuggestions.map((user) => (
              <div className="search-item" key={user.username}>
                <Link
                  to={`/${user.username}/`}
                  className="unstyled-link"
                  onClick={onCloseSearch}
                  style={{ display: "flex", alignItems: "center", flex: 1 }}
                >
                  <img
                    src={user.profileimg||defaultProfileImg}
                    className="profile-picture"
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                  <div
                    className="search-info"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="search-username" style={{ fontWeight: 600 }}>
                      {user.username}
                    </div>
                    {/* <div
                      className="search-sub"
                      style={{ color: "#888", fontSize: "14px" }}
                    >
                      {user.displayName}
                    </div> */}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p style={{ padding: "16px", color: "#888" }}>관련 계정 없음</p>
          )}
        </div>
      )}
    </>
  );
  
};

const formatPostCount = (count: number): string => {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}만`;
  return count.toString();
};

export default Search;
