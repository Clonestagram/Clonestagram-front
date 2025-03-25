// SearchSlider.tsx
import React from "react";
import { motion } from "framer-motion";
import "/src/styles/styles.css";

interface SearchSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSlider: React.FC<SearchSliderProps> = ({ isOpen, onClose }) => {
  return (
    <motion.div
      className="search-slider"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="search-header">
        <h2>검색</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      <input type="text" placeholder="검색" className="search-input" />
      <div className="recent-search">
        <p>최근 검색 항목</p>
        <div className="search-item">da_orom ✖</div>
        <div className="search-item">yun_ryy ✖</div>
        <button className="clear-btn">모두 지우기</button>
      </div>
    </motion.div>
  );
};

export default SearchSlider;
