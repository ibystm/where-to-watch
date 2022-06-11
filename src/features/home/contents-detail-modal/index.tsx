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
import { commonDictionaries } from "../../../commons/constants/dictionaries";
import { useSelector } from "../../../store";
import { ActualContentData } from "../../../types/redux/discovers";
import { DisplayWatchProviderResult } from "../hooks/useContentsProvider";

interface P {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ActualContentData;
  providerData: DisplayWatchProviderResult;
  youtubeUrl?: string;
}

export const ContentDetailModal: React.FC<P> = ({
  isOpen,
  onClose,
  currentItem,
  providerData,
  youtubeUrl,
}) => {
  const imageDataObj = useSelector((s) => s.configurations.images);
  const buildImagePath = (logoPath: string = ""): string => {
    if (imageDataObj === null) return "";
    return `${imageDataObj.secure_base_url}/original/${logoPath}`;
  };
  const existValidData =
    !!providerData?.flatrate && providerData?.flatrate.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="16px" w="90%" minH="60%">
        <ModalHeader marginRight="32px">{currentItem.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box marginBottom="2" display="flex" justifyContent="end">
            <Text>
              {`${commonDictionaries.releaseDate}: ${
                currentItem.releaseDate
                  ? currentItem.releaseDate.replaceAll("-", "/")
                  : "不明"
              }`}
            </Text>
          </Box>
          <Text>
            {currentItem.overview
              ? currentItem.overview
              : commonDictionaries.noOverview}
          </Text>
          <Box padding="16px">
            <Box textAlign="center" fontWeight="bold" mb="8px">
              <Text>視聴可能なストリーミングサービス</Text>
            </Box>
            <Flex justify="center" align="center" padding="16px">
              {existValidData ? (
                providerData?.flatrate.map((item, idx) => {
                  if (!item.provider_name) return null;

                  return (
                    <Image
                      key={idx}
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
            {existValidData && (
              <Text
                fontSize="12px"
                textAlign="center"
                // marginRight="48px"
                color="gray.500"
                fontFamily="monospace"
              >
                Data by Just Watch.
              </Text>
            )}
          </Box>
          <Flex justifyContent="center" alignItems="center" h="200px">
            {youtubeUrl && (
              <iframe
                src={youtubeUrl}
                title={currentItem.original_title}
                height="100%"
                width="100%"
              />
            )}
          </Flex>
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
