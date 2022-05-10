import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useMemo, VFC } from "react";
import { ContentDetailModal } from "./ContentDetailModal";
import { ContentItem } from "./ContentItem";
import { GenreChipsArea } from "./GenreChipsArea";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { useModalControl } from "./hooks/useModalControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const ContentsArea: VFC = () => {
  const { loading, data } = useDisplayContentsControl();
  const { currentContent, handleClose, handleOpen, isOpen } = useModalControl();

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
        />
      )}
    </>
  );
};
