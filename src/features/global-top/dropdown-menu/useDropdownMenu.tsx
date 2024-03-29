import { Icon, MenuItem, MenuList } from "@chakra-ui/react";
import {
  FiBookmark,
  FiCreditCard,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
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
        {/* TODO: about pageを作成するかは別途検討 */}
        {/* <MenuItem onClick={() => navigate("/about")}>
          <Icon as={FiInfo} mr="2" />
          Where to watchについて
        </MenuItem> */}
        <MenuItem onClick={() => navigate("/credits")}>
          <Icon as={FiCreditCard} mr="2" />
          Credits
        </MenuItem>
        {user.id === null && (
          <MenuItem onClick={() => navigate("/signin")}>
            <Icon as={FiLogIn} mr="2" />
            サインイン
          </MenuItem>
        )}
        {
          <MenuItem onClick={() => navigate("/bookmarks")}>
            <Icon as={FiBookmark} mr="2" />
            ブックマーク
          </MenuItem>
        }
        {typeof user.id === "string" && (
          <MenuItem onClick={() => navigate("/myprofile")}>
            <Icon as={FiUser} mr="2" />
            アカウント
          </MenuItem>
        )}
        {typeof user.id === "string" && (
          <MenuItem onClick={signOut}>
            <Icon as={FiLogOut} mr="2" />
            サインアウト
          </MenuItem>
        )}
      </MenuList>
    );
  };

  const result = { createMenuItems, isOpen, onClose };
  return result;
};
