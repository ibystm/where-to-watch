import { Box, SimpleGrid } from "@chakra-ui/react";
import { ContentItem } from "../content-item";
import { ContentDetailModal } from "../contents-detail-modal";
import { SkeltonContentItem } from "../skelton-content-item";
import { SearchResultHelperTextArea } from "./searchResultHelperTextArea";
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
    currentMode,
    youtubeUrl,
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
          youtubeUrl={youtubeUrl}
        />
      )}
    </>
  );
};
