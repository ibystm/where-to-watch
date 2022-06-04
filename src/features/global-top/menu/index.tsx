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
      <MenuItem command="⌘T">New Tab</MenuItem>
      <MenuItem command="⌘N">New Window</MenuItem>
      <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
      <MenuItem command="⌘O">Open File...</MenuItem>
    </MenuList>
  </Menu>
);
