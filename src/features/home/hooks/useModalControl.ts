import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Content } from "../../../types/contentsItem";

export const useModalControl = (): typeof result => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentContent, setCurrentContent] = useState<Content | null>(null);

  const handleClose = (): void => {
    setCurrentContent(null);
    onClose();
  };
  const handleOpen = (content: Content): void => {
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
