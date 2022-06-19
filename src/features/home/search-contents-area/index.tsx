import { Box, SimpleGrid } from "@chakra-ui/react";
import { ContentDetailModal } from "../contents-detail-modal";
import { SearchResultHelperTextArea } from "./searchResultHelperTextArea";
import { useSearchContentsArea } from "./useSearchContentsArea";

export const SearchContentsArea: React.FC = () => {
  const {
    searchedKeyword,
    handleCloseModal,
    contents,
    providerData,
    isOpen,
    currentContent,
    currentMode,
    youtubeUrl,
    renderContents,
  } = useSearchContentsArea();

  return (
    <>
      <Box my="24px">
        <SearchResultHelperTextArea
          contents={contents}
          searchedKeyword={searchedKeyword}
          currentMode={currentMode}
        />
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {renderContents()}
        </SimpleGrid>
      </Box>
      {currentContent !== null && (
        <ContentDetailModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          currentItem={currentContent}
          providerData={providerData}
          youtubeUrl={youtubeUrl}
        />
      )}
    </>
  );
};
