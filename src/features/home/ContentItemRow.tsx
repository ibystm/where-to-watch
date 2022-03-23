import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { ContentItem } from "./ContentItem";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { ContentCategories } from "./MainContents";

type P = {
  categoryName: ContentCategories;
};

export const ContentItemRow: FC<P> = ({ categoryName }) => {
  const { contentsList } = useDisplayContentsControl();
  const contentsMaps = useMemo(() => {
    switch (categoryName) {
      case "DiscoverMovies":
        return {
          name: commonDictionaries.discoverMovie,
          contents: contentsList.discoverMovies,
        };
      case "DiscoverTVShows":
        return {
          name: commonDictionaries.discoverTVShows,
          contents: contentsList.discoverTVShows,
        };
    }
  }, [categoryName, contentsList.discoverMovies, contentsList.discoverTVShows]);

  return (
    <Box marginY="24px">
      <Box marginLeft="32px">
        <Text fontSize="3xl" fontWeight="bold" color="gray.800">
          {contentsMaps.name}
        </Text>
      </Box>
      <SimpleGrid minChildWidth="240px" spacing="24px">
        {contentsMaps.contents.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
