import { MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../store";

export const useDropDownMenu = (): typeof result => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);
  const handleClickLisence = (): void => {
    navigate("/lisence");
  };

  const createMenuItems = (): JSX.Element => {
    return (
      <MenuList>
        <MenuItem>サインイン</MenuItem>
        <MenuItem>Where to watchについて</MenuItem>
        <MenuItem onClick={handleClickLisence}>Lisence</MenuItem>
        {typeof user.id === "string" && <MenuItem>アカウント</MenuItem>}
      </MenuList>
    );
  };

  const result = { createMenuItems };
  return result;
};
