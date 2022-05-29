import { createSelector } from "reselect";
import { RootState } from "../../../../store";
import { searchContentsAdoptor } from "../slice/searchContents";

export const searchContentsSelector = (state: RootState) =>
  state.searchContents;

export const searchModeSelector = createSelector(
  searchContentsSelector,
  (searchContents) => searchContents.searchMode
);
export const searchKeywordSelector = createSelector(
  searchContentsSelector,
  (searchContents) => searchContents.keyword
);
export const searchedContentsSelector =
  searchContentsAdoptor.getSelectors<RootState>(
    (state) => state.searchContents.searchedContents
  );
