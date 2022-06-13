import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../../../store";

export const useSwitchAuthButton = () => {
  const userId = useSelector((s) => s.user.id);
  const location = useLocation();
  const navigate = useNavigate();

  const buttonText = !!userId
    ? "Signout"
    : location.pathname === "/signin"
    ? "Sign Up"
    : "Sign In";

  const onPressButton = () => {
    if (!!userId) {
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
