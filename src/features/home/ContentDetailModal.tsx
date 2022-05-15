import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { WatchProviderResult } from "../../apis/types/discovers";
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { ActualContentData } from "../../types/redux/discovers";

interface P {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ActualContentData;
  providerData?: WatchProviderResult; // searchの方も完了したらoptional外す
}

export const ContentDetailModal: React.FC<P> = ({
  isOpen,
  onClose,
  currentItem,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginRight="32px">{currentItem.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box marginBottom="2" display="flex" justifyContent="end">
            <Text>
              {`公開日: ${
                currentItem.releaseDate ? currentItem.releaseDate : "不明"
              }`}
            </Text>
          </Box>
          <Text>
            {currentItem.overview
              ? currentItem.overview
              : commonDictionaries.noOverview}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
