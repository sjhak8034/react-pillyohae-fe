// components/LogoutButton.tsx
import AuthButton from "./AuthButton";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <AuthButton
      text="logout"
      icon={faArrowRightFromBracket}
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
