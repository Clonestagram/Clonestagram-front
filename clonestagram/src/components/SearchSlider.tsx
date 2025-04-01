import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "./Search";
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
        <div className="search-content">
        <Search
          search={search}
          setSearch={setSearch}
          recentSearches={recentSearches}
          removeItem={removeItem}
          clearAll={clearAll}
          onCloseSearch={onClose}
        />
        </div>
      </motion.div>
    );
  };
  
  export default SearchSlider;