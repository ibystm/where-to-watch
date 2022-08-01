import { MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../store";
import { useSignOut } from "../../sign-in/useSignOut";

export const useDropDownMenu = (): typeof result => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);
  const { signOut, isOpen, onClose } = useSignOut();

  const createMenuItems = (): JSX.Element => {
    return (
      <MenuList>
        {/* TODO */}
        {user.id === null && (
          <MenuItem onClick={() => navigate("/signin")}>サインイン</MenuItem>
        )}
        <MenuItem onClick={() => navigate("/about")}>
          Where to watchについて
        </MenuItem>
        <MenuItem onClick={() => navigate("/credits")}>Credits</MenuItem>
        {typeof user.id === "string" && (
          <MenuItem onClick={() => navigate("/myprofile")}>アカウント</MenuItem>
        )}
        {typeof user.id === "string" && (
          <MenuItem onClick={signOut}>サインアウト</MenuItem>
        )}
      </MenuList>
    );
  };

  const result = { createMenuItems, isOpen, onClose };
  return result;
};
