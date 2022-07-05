import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useDropDownMenu } from "./useDropdownMenu";

//TODO ログイン系のボタンをMenu内に配置
export const DropDownMenu: React.FC = () => {
  const { createMenuItems, isOpen, onClose } = useDropDownMenu();

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        {createMenuItems()}
      </Menu>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalContent>
          <ModalBody>
            <Text textAlign="center">ログアウトしました</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
