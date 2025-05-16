import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/SearchBar.css";
import React, { useState, useEffect } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const searchItems = ["Apple", "Banana", "Carrot", "Date", "Egg"];

  return (
    <>
      {/* 포커스 시 화면 전체에 그림자 배경 */}
      <SearchOverlay isActive={focused} onClick={() => setFocused(false)} />
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="검색어를 입력하세요"
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-icon-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {/* 드롭다운 */}
        {focused && query && (
          <div className="search-dropdown">
            {searchItems
              .filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, idx) => (
                <div className="search-dropdown-item" key={idx}>
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

const SearchOverlay = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  const navbarHeight = useNavbarHeight();

  if (!isActive) return null;

  return (
    <div
      className="search-overlay"
      onClick={onClick}
      style={{
        position: "fixed",
        top: navbarHeight,
        left: 0,
        width: "100vw",
        height: `calc(100vh - ${navbarHeight}px)`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999, // MyNavBar는 zIndex 1000 이상
      }}
    />
  );
};

const useNavbarHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector(".navbar"); // 부트스트랩 Navbar
    if (navbar) {
      setHeight(navbar.getBoundingClientRect().height);
    }

    const handleResize = () => {
      if (navbar) {
        setHeight(navbar.getBoundingClientRect().height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};

export default SearchBar;
