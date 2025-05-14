import "../styles/AiAssistButton.css";
import { useState, FC } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
const AiAssistButton: FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <button
      className="Button fixed-bottom-right animated-button"
      onClick={() => navigate("/AiAssist")}
    >
      <FontAwesomeIcon icon={faRobot} className="icon" />
      <span className="label">AI에게 제품 추천받기</span>
      <span className="Button-mask Button-slides slides-right Graident-five"></span>
    </button>
  );
};

export default AiAssistButton;
