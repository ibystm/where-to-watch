import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { ContentDetailModal } from "./ContentDetailModal";
import { ContentItem } from "./ContentItem";
import { GenreChipsArea } from "./GenreChipsArea";
import { useContentsProvider } from "./hooks/useContentsProvider";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { useModalControl } from "./hooks/useModalControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const ContentsArea: FC = () => {
  const { loading, data } = useDisplayContentsControl();
  const { currentContent, handleClose, handleOpen, isOpen } = useModalControl();
  const { providerData } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );
  const contents = useMemo(
    () =>
      loading
        ? [...Array(20)].map((_, idx) => <SkeltonContentItem key={idx} />)
        : data.map((item, idx) => (
            <ContentItem key={idx} contentItem={item} modalOpen={handleOpen} />
          )),
    [data, handleOpen, loading]
  );

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
          onClose={handleClose}
          currentItem={currentContent}
          providerData={providerData}
        />
      )}
    </>
  );
};
