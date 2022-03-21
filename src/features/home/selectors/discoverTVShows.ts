import { RootState } from "../../../store/store";
export const discoverTVShowsSelectors = {
  discoverTVShows: (state: RootState) => state.discoverTVShows.data,
  isDiscoverTVShowsLoading: (state: RootState) =>
    state.discoverTVShows.loading.isProcessing,
};
