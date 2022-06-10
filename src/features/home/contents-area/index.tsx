import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { FC } from "react";
import { ContentItem } from "../content-item";
import { ContentDetailModal } from "../contents-detail-modal";
import { GenreChipsArea } from "../genre-chips-area";
import { SkeltonContentItem } from "../skelton-content-item/index";
import { useContentsArea } from "./useContentsArea";

const dummySleltons = [...Array(20)].map((_, idx) => {
  return <SkeltonContentItem key={idx} />;
});

export const ContentsArea: FC = () => {
  const {
    isOpen,
    isLoading,
    handleOpen,
    handleCloseModal,
    resultContents,
    currentContent,
    providerData,
    youtubeUrl,
  } = useContentsArea();

  return (
    <>
      <Box>
        <GenreChipsArea />
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {isLoading
            ? dummySleltons
            : resultContents.map((item, idx) => (
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
