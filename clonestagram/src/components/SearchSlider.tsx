import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import "/src/styles/styles.css";
import doKyungImg from "../assets/profilepictures/do_kyung.jpeg";
import mimiImg from "../assets/profilepictures/mimirabbit.jpeg";

interface SearchSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyRecentSearches = [
    {
      username: "do_kyung",
      displayName: "도경구",
      image: doKyungImg,
    },
    {
      username: "mimirabbit",
      displayName: "미미",
      image: mimiImg,
    },
  ];

const SearchSlider: React.FC<SearchSliderProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState(dummyRecentSearches);

  const clearAll = () => setRecentSearches([]);
  const removeItem = (username: string) => {
    setRecentSearches(recentSearches.filter(user => user.username !== username));
  };

  return (
    <motion.div
      className="search-slider"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="search-header">
        <h2>검색</h2>
      </div>
      <div className="search-input-wrapper" style={{ position: "relative", width: "100%" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{
              width: "90%",
              borderRadius: "10px",
              padding: "10px 36px 10px 12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer"
              }}
            >
              <X size={18} color="#888" />
            </button>
          )}
        </div>
      </div>

      <div className="search-history">
        <div className="search-history-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderTop: "1px solid #ddd", margin:"20px 10px" }}>
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={user.image}
                  alt={user.username}
                  className="search-avatar"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", marginRight: "12px" }}
                />
                <div className="search-info" style={{ display: "flex", flexDirection: "column" }}>
                 <div className="search-username" style={{ fontWeight: 600, textAlign: "left" }}>
                    {user.username}
                </div>
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
    </motion.div>
  );
};

export default SearchSlider;