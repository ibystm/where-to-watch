import { Box, Text } from "@chakra-ui/react";
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
      // case "UPCOMING_MOVIES":
      //   return {
      //     name: commonDictionaries.upconmingMovies,
      //     contents: contentsList.upcomingMovies.contents,
      //     loading: contentsList.upcomingMovies.loading,
      //   };
      case "POPULAR_MOVIES":
        return {
          name: commonDictionaries.popuolarMovies,
          contents: contentsList.popularMovies.contents,
          loading: contentsList.popularMovies.loading,
        };
      case "POPULAR_TVS":
        return {
          name: commonDictionaries.popularTVs,
          contents: contentsList.popularTVs.contents,
          loading: contentsList.popularTVs.loading,
        };
      default: {
        const strangeValue: never = categoryName;
        throw new Error(`${strangeValue} is not categoryName`);
      }
    }
  }, [
    categoryName,
    contentsList.discoverMovies.contents,
    contentsList.discoverMovies.loading,
    contentsList.discoverTVShows.contents,
    contentsList.discoverTVShows.loading,
    contentsList.popularMovies.contents,
    contentsList.popularMovies.loading,
    contentsList.popularTVs.contents,
    contentsList.popularTVs.loading,
  ]);

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
    <Box height="360px" marginBottom="32px">
      <Box marginLeft="32px">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {contentsMaps.name}
        </Text>
      </Box>
      <Box
        height="100%"
        display="flex"
        overflow="scroll hidden"
        paddingY="1rem"
      >
        {contents}
      </Box>
    </Box>
  );
};
