import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton } from "@chakra-ui/react";
import { useDropDownMenu } from "./useDropdownMenu";

//TODO ログイン系のボタンをMenu内に配置
export const DropDownMenu: React.FC = () => {
  const { createMenuItems } = useDropDownMenu();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      {createMenuItems()}
    </Menu>
  );
};
