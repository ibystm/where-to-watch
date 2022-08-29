import {
  AspectRatio,
  Box,
  Button,
  Divider,
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
import { ContentDetail } from "../../../apis/types/ContentDetails";
import { commonDictionaries } from "../../../commons/constants/dictionaries";
import { useSelector } from "../../../store";
import { ActualContentData } from "../../../types/redux/discovers";
import { DisplayWatchProviderResult } from "../hooks/useContentsProvider";

interface P {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ActualContentData | ContentDetail;
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
  const { title, release_date, original_title, overview } = currentItem;
  const imageDataObj = useSelector((s) => s.configurations.images);
  const buildImagePath = (logoPath: string = ""): string => {
    if (imageDataObj === null) return "";
    return `${imageDataObj.secure_base_url}/original/${logoPath}`;
  };
  const existsValidData =
    !!providerData?.flatrate && providerData?.flatrate.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay
        backdropFilter="auto"
        backdropInvert="10%"
        backdropBlur="4px"
      />
      <ModalContent padding="16px">
        <ModalHeader marginRight="32px">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Box marginBottom="2" display="flex" justifyContent="end">
            <Text>
              {`${commonDictionaries.releaseDate}: ${
                release_date ? release_date.replaceAll("-", "/") : "不明"
              }`}
            </Text>
          </Box>
          <Text paddingY="8">
            {overview ? overview : commonDictionaries.noOverview}
          </Text>
          <Divider borderColor="gray.300" />
          <Box p="8">
            <Box textAlign="center" fontWeight="bold" mb="8px">
              <Text>視聴可能なストリーミングサービス</Text>
            </Box>
            <Flex justify="center" align="center" padding="16px">
              {existsValidData ? (
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
            {existsValidData && (
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

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {youtubeUrl && (
              <>
                <Box p="4">
                  <Text fontWeight="semibold">Trailer video</Text>
                </Box>
                <AspectRatio ratio={16 / 9} w="100%">
                  <iframe
                    src={youtubeUrl}
                    title={original_title}
                    allowFullScreen
                  />
                </AspectRatio>
              </>
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
