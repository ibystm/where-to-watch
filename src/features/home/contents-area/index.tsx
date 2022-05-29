import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { ContentItem } from "../content-item";
import { ContentDetailModal } from "../contents-detail-modal";
import { GenreChipsArea } from "../genre-chips-area";
import { useContentsProvider } from "../hooks/useContentsProvider";
import { useDisplayContentsControl } from "../hooks/useDisplayContentsControl";
import { useModalControl } from "../hooks/useModalControl";
import { usePageEndScrollObserve } from "../hooks/usePageEndScrollObserve";
import { SkeltonContentItem } from "../skelton-content-item/index";

export const ContentsArea: FC = () => {
  const { loading, data } = useDisplayContentsControl();
  usePageEndScrollObserve();
  const { currentContent, handleClose, handleOpen, isOpen } = useModalControl();
  const { providerData, resetCurrentData } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );
  const contents = useMemo(
    () =>
      loading
        ? [...Array(20)].map((_, idx) => {
            return <SkeltonContentItem key={idx} />;
          })
        : data.map((item, idx) => (
            <ContentItem key={idx} contentItem={item} modalOpen={handleOpen} />
          )),
    [data, handleOpen, loading]
  );
  const handleCloseModal = (): void => {
    resetCurrentData();
    handleClose();
  };

  return (
    <>
      <Box>
        <GenreChipsArea />
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {contents}
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
