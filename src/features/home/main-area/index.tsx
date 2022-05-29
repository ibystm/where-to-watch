import React from "react";
import { useSelector } from "react-redux";
import { searchModeSelector } from "../../global/header/selectors/searchContents";
import { ContentsArea } from "../contents-area";
import { SearchContentsArea } from "../search-contents-area";

export const MainArea: React.FC = () => {
  const isSearchMode = useSelector(searchModeSelector);

  return isSearchMode ? <SearchContentsArea /> : <ContentsArea />;
};
