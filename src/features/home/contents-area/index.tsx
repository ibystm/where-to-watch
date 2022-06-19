import { Box, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { ContentDetailModal } from "../contents-detail-modal";
import { GenreChipsArea } from "../genre-chips-area";
import { useContentsArea } from "./useContentsArea";

export const ContentsArea: FC = () => {
  const {
    isOpen,
    handleCloseModal,
    currentContent,
    providerData,
    youtubeUrl,
    renderContents,
  } = useContentsArea();

  return (
    <>
      <Box>
        <GenreChipsArea />
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
