import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "../../../store";
import {
  searchedContentsSelector,
  searchKeywordSelector,
} from "../../global/header/selectors/searchContents";
import { ContentDetailModal } from "../ContentDetailModal";
import { ContentItem } from "../ContentItem";
import { useContentsProvider } from "../hooks/useContentsProvider";
import { useModalControl } from "../hooks/useModalControl";
import { SkeltonContentItem } from "../SkeltonContentItem";

export const SearchContentsArea: React.FC = () => {
  const { isOpen, handleClose, handleOpen, currentContent } = useModalControl();
  const { providerData, resetCurrentData } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );
  const contents = useSelector(searchedContentsSelector.selectAll);
  const searchedKeyword = useSelector(searchKeywordSelector);
  const searchedContentsArea = false
    ? [...Array(100)].map((_, idx) => <SkeltonContentItem key={idx} />)
    : contents.map((item, idx) => (
        <ContentItem key={idx} contentItem={item} modalOpen={handleOpen} />
      ));
  const handleCloseModal = (): void => {
    resetCurrentData();
    handleClose();
  };

  console.log({ providerData });

  return (
    <>
      <Box marginY="24px">
        <Box marginLeft="32px">
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            {`${searchedKeyword} の検索結果`}
          </Text>
        </Box>
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {searchedContentsArea}
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
