import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FC } from "react";
import CategoryBarCss from "../styles/CategoryBar.css?inline"; // Import your CSS styles
import "../styles/CategoryBar.css"; // Import your CSS styles

const categories = [
  { name: "신발", path: "/shoes" },
  { name: "의류", path: "/clothes" },
  { name: "가방", path: "/bags" },
  { name: "액세서리", path: "/accessories" },
];

const CategoryBar: FC = () => {
  return (
    <div className="category-bar">
      <div className="category-buttons" style={{}}>
        {categories.map((category) => (
          <CategoryButton key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

const CategoryButton: FC<{ category: { name: string; path: string } }> = ({
  category,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === category.path;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shadowRoot =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = ""; // 매 렌더마다 재구성

    const aqua = document.createElement("link");
    aqua.rel = "stylesheet";
    aqua.href =
      "https://cdn.jsdelivr.net/npm/@alphardex/aqua.css/dist/aqua.min.css";

    const style = document.createElement("style");
    style.textContent = CategoryBarCss;

    const button = document.createElement("button");
    button.className = `btn btn-ghost btn-open-line btn-custom ${
      isActive ? "hover" : ""
    }`;
    button.textContent = category.name;

    button.addEventListener("click", () => navigate(category.path));

    shadowRoot.appendChild(aqua);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(button);
  }, [category, navigate, isActive]);

  return <div ref={containerRef} />;
};

export default CategoryBar;
