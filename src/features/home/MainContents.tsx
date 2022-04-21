import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { searchModeSelector } from "../global/header/selectors/searchContents";
import { ContentsArea } from "./ContentsArea";
import { SearchContentsArea } from "./SearchContentsArea";

export const MainContens: React.FC = () => {
  const isSearchMode = useSelector(searchModeSelector);

  return (
    <Box paddingX="40px" paddingBottom="40px">
      {isSearchMode ? <SearchContentsArea /> : <ContentsArea />}
    </Box>
  );
};
