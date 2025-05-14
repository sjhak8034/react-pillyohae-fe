import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/NavButton.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserProfileResponseDto } from "../api/users";

export const MyPageButton: FC = () => {
  const user: UserProfileResponseDto | null = useSelector(
    (state: RootState) => state.user.user
  );

  if (!user) return null; // user가 없으면 렌더링 안 함

  return (
    <>
      <button className="nav-button">
        <FontAwesomeIcon className="icon" icon={faCircleUser} />
      </button>
      <div
        className="user-info"
        style={{
          display: "flex",
          flexDirection: "column",
          wordBreak: "keep-all",
          textAlign: "left",
          flexShrink: 0,
          color: "white",
          marginLeft: "10px",
        }}
      >
        <div>{`안녕하세요 ${user.name}님`}</div>
        <div>{`현재 배송지: ${user.address.roadAddress}`}</div>
      </div>
    </>
  );
};
