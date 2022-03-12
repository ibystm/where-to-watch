import { RootState } from "../../../../store/store";
export const searchMovieSelectors = {
  loadingState: (state: RootState) => state.searchMovies.loading.isProcessing,
  searchedMovies: (state: RootState) => state.searchMovies.searchMovies,
  searchMode: (state: RootState) => state.searchMovies.searchMode,
};
