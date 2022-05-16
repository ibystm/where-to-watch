import {
  Box,
  Button,
  Flex,
  Image,
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
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { useSelector } from "../../store/store";
import { ActualContentData } from "../../types/redux/discovers";
import { DisplayWatchProviderResult } from "./hooks/useContentsProvider";

interface P {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ActualContentData;
  providerData?: DisplayWatchProviderResult; // searchの方も完了したらoptional外す
}

export const ContentDetailModal: React.FC<P> = ({
  isOpen,
  onClose,
  currentItem,
  providerData,
}) => {
  const imageDataObj = useSelector((s) => s.configurations.images);
  const buildImagePath = (logoPath: string = ""): string => {
    if (imageDataObj === null) return "";
    return `${imageDataObj.secure_base_url}/original/${logoPath}`;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginRight="32px">{currentItem.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box marginBottom="2" display="flex" justifyContent="end">
            <Text>
              {`${commonDictionaries.releaseDate}: ${
                currentItem.releaseDate ? currentItem.releaseDate : "不明"
              }`}
            </Text>
          </Box>
          <Text padding="16px">
            {currentItem.overview
              ? currentItem.overview
              : commonDictionaries.noOverview}
          </Text>
          <Box padding="16px">
            <Box textAlign="center" fontWeight="bold" mb="8px">
              <Text>視聴可能なストリーミングサービス</Text>
            </Box>
            <Flex justify="center" align="center" padding="16px">
              {providerData?.flatrate && providerData?.flatrate.length > 0 ? (
                providerData?.flatrate.map((item) => {
                  if (!item.provider_name) return null;

                  return (
                    <Image
                      boxSize="48px"
                      src={buildImagePath(item.logo_path)}
                      marginRight="16px"
                      borderRadius="4px"
                    />
                  );
                })
              ) : (
                <Text>現在はありません</Text>
              )}
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
