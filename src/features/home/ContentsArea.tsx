import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useMemo, VFC } from "react";
import { ContentItem } from "./ContentItem";
import { GenreChipsArea } from "./GenreChipsArea";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const ContentsArea: VFC = () => {
  const { results } = useDisplayContentsControl();

  const contents = useMemo(
    () =>
      results.loading
        ? [...Array(20)].map((_, idx) => <SkeltonContentItem key={idx} />)
        : results.data.map((item, idx) => (
            <ContentItem key={idx} contentItem={item} />
          )),
    [results.data, results.loading]
  );

  return (
    <Box>
      <GenreChipsArea />
      <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
        {contents}
      </SimpleGrid>
    </Box>
  );
};
