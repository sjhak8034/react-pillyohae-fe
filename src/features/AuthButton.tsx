// components/AuthButton.tsx
import { useState, FC } from "react";
import "../styles/NavButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AuthButtonProps {
  text: string;
  icon: IconDefinition;
  onClick: () => void;
}

const AuthButton: FC<AuthButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {text}
      <FontAwesomeIcon className="icon" icon={icon} />
    </button>
  );
};

export default AuthButton;
