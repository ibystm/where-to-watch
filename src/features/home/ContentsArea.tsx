import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import React, { useMemo, VFC } from "react";
import { ContentDetailModal } from "./ContentDetailModal";
import { ContentItem } from "./ContentItem";
import { GenreChipsArea } from "./GenreChipsArea";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const ContentsArea: VFC = () => {
  const { loading, data } = useDisplayContentsControl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const contents = useMemo(
    () =>
      loading
        ? [...Array(20)].map((_, idx) => <SkeltonContentItem key={idx} />)
        : data.map((item, idx) => (
            <ContentItem key={idx} contentItem={item} modalOpen={onOpen} />
          )),
    [data, loading, onOpen]
  );

  return (
    <>
      <Box>
        <GenreChipsArea />
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {contents}
        </SimpleGrid>
      </Box>
      <ContentDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
