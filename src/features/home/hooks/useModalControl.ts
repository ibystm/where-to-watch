import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ActualContentData } from "../../../types/redux/discovers";

export const useModalControl = (): typeof result => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentContent, setCurrentContent] =
    useState<ActualContentData | null>(null);

  const handleClose = (): void => {
    setCurrentContent(null);
    onClose();
  };
  const handleOpen = (content: ActualContentData): void => {
    setCurrentContent(content);
    onOpen();
  };

  const result = {
    isOpen,
    currentContent,
    handleOpen,
    handleClose,
  };

  return result;
};
