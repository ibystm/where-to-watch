import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentsArea } from "./ContentsArea";
import { SearchContentsArea } from "./SearchContentsArea";

export const MainContens: React.FC = () => {
  const isSearchMode = useSelector(searchMovieSelectors.searchMode);

  return (
    <Box paddingX="40px" paddingBottom="40px">
      {isSearchMode ? <SearchContentsArea /> : <ContentsArea />}
    </Box>
  );
};
