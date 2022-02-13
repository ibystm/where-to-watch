import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../../../store/slices/usersSlice";

export const useSwitchAuthButton = () => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const buttonText = !!user.id
    ? "Signout"
    : location.pathname === "/signin"
    ? "Sign Up"
    : "Sign In";

  const onPressButton = () => {
    if (!!user.id) {
      // logout
    }
    if (location.pathname === "/signin") {
      navigate("/signup");
    }
    if (location.pathname === "/signup") {
      navigate("/signin");
    }
  };

  return {
    buttonText,
    onPressButton,
  };
};
