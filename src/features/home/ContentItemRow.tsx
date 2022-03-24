import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useMemo, VFC } from "react";
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { ContentItem } from "./ContentItem";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { ContentCategories } from "./MainContents";
import { SkeltonContentItem } from "./SkeltonContentItem";

type P = {
  categoryName: ContentCategories;
};

export const ContentItemRow: VFC<P> = ({ categoryName }) => {
  const { contentsList } = useDisplayContentsControl();
  const contentsMaps = useMemo(() => {
    switch (categoryName) {
      case "DiscoverMovies":
        return {
          name: commonDictionaries.discoverMovie,
          contents: contentsList.discoverMovies.contents,
          loading: contentsList.discoverMovies.loading,
        };
      case "DiscoverTVShows":
        return {
          name: commonDictionaries.discoverTVShows,
          contents: contentsList.discoverTVShows.contents,
          loading: contentsList.discoverTVShows.loading,
        };
    }
  }, [categoryName, contentsList.discoverMovies, contentsList.discoverTVShows]);

  const contents = useMemo(
    () =>
      contentsMaps.loading
        ? [...Array(20)].map((_, idx) => <SkeltonContentItem key={idx} />)
        : contentsMaps.contents.map((item, idx) => (
            <ContentItem key={idx} contentItem={item} />
          )),
    [contentsMaps.contents, contentsMaps.loading]
  );

  return (
    <Box marginY="24px">
      <Box marginLeft="32px">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {contentsMaps.name}
        </Text>
      </Box>
      <SimpleGrid minChildWidth="240px" spacing="24px">
        {contents}
      </SimpleGrid>
    </Box>
  );
};
