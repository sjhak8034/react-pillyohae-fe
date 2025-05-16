import { FC } from "react";
import { Navbar, Container } from "react-bootstrap";
import SearchBar from "../components/common/SearchBar";
import LoginButton from "./LoginButton";
import CartButton from "./CartButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserProfileResponseDto } from "../api/users";
import LogoutButton from "./LogoutButton";
import { MyPageButton } from "./MyPageButton";

const NavBar: FC = () => {
  const user: UserProfileResponseDto | null = useSelector(
    (state: RootState) => state.user.user
  );

  const isLoggedIn = !!user;

  console.log(isLoggedIn);

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#329632" }}>
      <Container className="d-flex flex-nowrap align-items-center justify-content-between">
        <Navbar.Brand
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          <h1 className="main-logo-font">pillyohae</h1>
        </Navbar.Brand>
        <SearchBar />
        {!isLoggedIn && <LoginButton />}
        {isLoggedIn && <LogoutButton />}
        <CartButton />
        {isLoggedIn && <MyPageButton />}
      </Container>
    </Navbar>
  );
};

export default NavBar;
