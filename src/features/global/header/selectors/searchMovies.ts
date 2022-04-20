import { RootState } from "../../../../store/store";

export const searchMovieSelectors = {
  searchedMovies: (state: RootState) => state.searchContents.searchedContents,
  searchMode: (state: RootState) => state.searchContents.searchMode,
  searchKeyword: (state: RootState) => state.searchContents.keyword,
};
