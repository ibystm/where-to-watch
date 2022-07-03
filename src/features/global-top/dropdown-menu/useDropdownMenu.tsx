import { MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../store";

export const useDropDownMenu = (): typeof result => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);

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
        {typeof user.id === "string" && <MenuItem>アカウント</MenuItem>}
        {typeof user.id === "string" && <MenuItem>サインアウト</MenuItem>}
      </MenuList>
    );
  };

  const result = { createMenuItems };
  return result;
};
