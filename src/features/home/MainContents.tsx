import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItemRow } from "./ContentItemRow";
import { SearchContentsArea } from "./SearchContentsArea";

const ContentCategories = {
  DiscoverMovies: "DiscoverMovies",
  DiscoverTVShows: "DiscoverTVShows",
  // UPCOMING_MOVIES: "UPCOMING_MOVIES",
  POPULAR_MOVIES: "POPULAR_MOVIES",
  POPULAR_TVS: "POPULAR_TVS",
  // SearchContents: "SearchContents",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ContentCategories =
  typeof ContentCategories[keyof typeof ContentCategories];

export const MainContens: React.FC = () => {
  const isSearchMode = useSelector(searchMovieSelectors.searchMode);

  return (
    <Box paddingX="40px">
      {isSearchMode ? (
        <SearchContentsArea />
      ) : (
        Object.keys(ContentCategories).map((name, idx) => (
          <ContentItemRow categoryName={name as ContentCategories} key={idx} />
        ))
      )}
    </Box>
  );
};
