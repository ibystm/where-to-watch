import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

//TODO ログイン系のボタンをMenu内に配置
export const DropDownMenu: React.FC = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      variant="outline"
    />
    <MenuList>
      <MenuItem>サインイン</MenuItem>
      <MenuItem>Where to watchについて</MenuItem>
      <MenuItem>Lisence</MenuItem>
      <MenuItem>アカウント</MenuItem>
    </MenuList>
  </Menu>
);
