import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { ContentItem } from "../content-item";
import { ContentDetailModal } from "../contents-detail-modal";
import { SkeltonContentItem } from "../skelton-content-item";
import { useSearchContentsArea } from "./useSearchContentsArea";

const dummyLoadingSkeltons = [...Array(100)].map((_, idx) => (
  <SkeltonContentItem key={idx} />
));

export const SearchContentsArea: React.FC = () => {
  const {
    searchedKeyword,
    handleOpen,
    handleCloseModal,
    contents,
    providerData,
    isOpen,
    currentContent,
    loading,
  } = useSearchContentsArea();

  return (
    <>
      <Box marginY="24px">
        {contents.length > 0 ? (
          <Box marginLeft="32px">
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {`${searchedKeyword} の検索結果`}
            </Text>
          </Box>
        ) : (
          <Flex justifyContent="center" pt="100px">
            <Text fontSize="xl">
              {`${searchedKeyword}に一致する結果はありませんでした。`}
            </Text>
          </Flex>
        )}

        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {loading
            ? dummyLoadingSkeltons
            : contents.map((item, idx) => (
                <ContentItem
                  key={idx}
                  contentItem={item}
                  modalOpen={handleOpen}
                />
              ))}
        </SimpleGrid>
      </Box>
      {currentContent !== null && (
        <ContentDetailModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          currentItem={currentContent}
          providerData={providerData}
        />
      )}
    </>
  );
};
