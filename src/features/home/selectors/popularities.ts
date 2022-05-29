import { RootState } from "../../../store";
import { popularitiesAdopter } from "../slice/popularities/index";

export const popularMovieSelector = popularitiesAdopter.getSelectors(
  (state: RootState) => state.popularities.movies
);
export const popularTVsSelector = popularitiesAdopter.getSelectors(
  (state: RootState) => state.popularities.tvs
);
