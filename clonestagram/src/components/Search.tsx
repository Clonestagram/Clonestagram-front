import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import { X } from "lucide-react";
import "/src/styles/styles.css";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  recentSearches: { username: string; displayName: string; image: string }[];
  removeItem: (username: string) => void;
  clearAll: () => void;
  onCloseSearch: () => void; // ✅ 추가
}

const dummyHashtags = [
    "#여행", "#맛집", "#운동", "#개발자", "#클론스타그램", "#스타트업"
  ];

const Search: React.FC<SearchProps> = ({ search, setSearch, recentSearches, removeItem, clearAll, onCloseSearch }) => {
    const isHashtagSearch = search.startsWith("#");

    const navigate = useNavigate();

    const handleHashtagClick = (tag: string) => {
        setSearch("");
        onCloseSearch(); // ✅ 검색창 닫기
        navigate(`/hashtag/${encodeURIComponent(tag.replace("#", ""))}`);
      };
      


    return (
    <>
      <div className="search-input-wrapper" >
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="search-clear-btn"
            >
              <X size={18} color="#888" />
            </button>
          )}
        </div>
      </div>

      {isHashtagSearch ? (
        <div className="hashtag-list">
          {dummyHashtags
            .filter(tag => tag.includes(search.toLowerCase()))
            .map(tag => (
              <div
                className="hashtag-item"
                key={tag}
                onClick={() => handleHashtagClick(tag)}
              >
                <span>{tag}</span>
              </div>
            ))}
        </div>
      ) : (


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
            <div
              className="search-item"
              key={user.username}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={user.image}
                  alt={user.username}
                  className="search-avatar"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", marginRight: "12px" }}
                />
                <div className="search-info" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="search-username" style={{ fontWeight: 600, textAlign: "left" }}>{user.username}</div>
                  <div className="search-sub" style={{ color: "#888", fontSize: "14px" }}>{user.displayName} · 팔로잉</div>
                </div>
              </div>
              <X
                size={20}
                className="search-remove-btn"
                style={{ cursor: "pointer", color: "#999" }}
                onClick={() => removeItem(user.username)}
              />
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  );
};

export default Search;
