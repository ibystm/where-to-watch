import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { searchModeSelector } from "../../global/header/selectors/searchContents";
import { ContentsArea } from "../contents-area";
import { SearchContentsArea } from "../search-contents-area";

export const MainArea: React.FC = () => {
  const isSearchMode = useSelector(searchModeSelector);

  return (
    <Box paddingX="40px" paddingBottom="40px">
      {isSearchMode ? <SearchContentsArea /> : <ContentsArea />}
    </Box>
  );
};
