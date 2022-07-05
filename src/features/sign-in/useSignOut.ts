import { useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { actions } from "../../store";
import { signOutUser } from "../../store/slices/usersSlice";

export const useSignOut = (): typeof result => {
  const dispatch = useDispatch();
  const { startLoading, endLoading } = actions;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = async () => {
    startLoading();
    await auth.signOut();
    dispatch(signOutUser());
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
