import { useDisclosure } from "@chakra-ui/react";
import { auth } from "../../app/firebase";
import { useActions } from "../../hooks/useActions";
import { actions } from "../../store";

export const useSignOut = (): typeof result => {
  const { startLoading, endLoading, signOutUser } = useActions(actions);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = async () => {
    startLoading();
    await auth.signOut();
    signOutUser();
    onOpen();
    endLoading();
  };

  const result = {
    signOut,
    isOpen,
    onClose,
  };
  return result;
};
