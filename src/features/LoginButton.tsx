// components/LoginButton.tsx
import AuthButton from "./AuthButton";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <AuthButton
      text="login"
      icon={faArrowRightToBracket}
      onClick={() => navigate("/login")}
    />
  );
};

export default LoginButton;
