import React, { useEffect, useRef } from "react";
import CategoryBarCss from "../styles/CategoryBar.css?inline"; // Import your CSS styles
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate from react-router-dom
import { FC } from "react";

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

export default CategoryButton;
