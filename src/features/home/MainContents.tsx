import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItem } from "./ContentItem";
import { ContentItemRow } from "./ContentItemRow";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

const ContentCategories = {
  DiscoverMovies: "DiscoverMovies",
  DiscoverTVShows: "DiscoverTVShows",
  // SearchContents: "SearchContents",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ContentCategories =
  typeof ContentCategories[keyof typeof ContentCategories];

export const MainContens: React.FC = () => {
  const isSearchMode = useSelector(searchMovieSelectors.searchMode);
  const { contentsList } = useDisplayContentsControl();
  const { searchedContents } = contentsList;
  const searchedContentsArea = searchedContents.loading
    ? [...Array(100)].map((_, idx) => <SkeltonContentItem key={idx} />)
    : searchedContents.contents.map((item, idx) => (
        <ContentItem key={idx} contentItem={item} />
      ));

  return (
    <Box paddingX="40px">
      {isSearchMode ? (
        <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
          {searchedContentsArea}
        </SimpleGrid>
      ) : (
        Object.keys(ContentCategories).map((name, idx) => (
          <ContentItemRow categoryName={name as ContentCategories} key={idx} />
        ))
      )}
    </Box>
  );
};
