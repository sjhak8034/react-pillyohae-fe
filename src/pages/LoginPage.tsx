import { FC } from "react";
import "../styles/LoginPage.css";
import "../styles/Input.css";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/common/LoginForm";

const LoginPage: FC = () => {
  return (
    <div
      className="login-page-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1
        className="main-logo-font"
        style={{
          color: "#329632",
          cursor: "pointer",
          marginTop: "25px",
        }}
        onClick={() => (window.location.href = "/")}
      >
        pillyohae
      </h1>

      <div
        className="login-page"
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "25px",
          width: "900px",
          height: "740px",
        }}
      >
        <LoginForm />

        <Link
          to="/sign-up"
          style={{
            background: "none",
            border: "none",
            color: "#329632",
            textDecoration: "none",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          sign up
        </Link>

        <div
          className="or-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <hr className="or-wrapper line" />
          <span style={{ padding: "0 10px", color: "#666" }}>or</span>
          <hr className="or-wrapper line" />
        </div>

        <button className="social-login-button kakao">
          <img src="/images/KakaoTalk_logo.svg" style={{ height: "30px" }} />
          <span
            className="kakao-text"
            style={{ marginTop: "2px", marginLeft: "39px" }}
          >
            Login with KakaoTalk
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
