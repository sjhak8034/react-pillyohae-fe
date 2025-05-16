import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavButton.css"; // Import your CSS styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons

const CartButton: FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <button
      className={`nav-button ${isHovering ? "hover" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <FontAwesomeIcon className="icon" icon={faCartShopping} />
    </button>
  );
};

export default CartButton;
