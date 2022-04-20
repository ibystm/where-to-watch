import { RootState } from "../../../store/store";
import { popularitiesAdopter } from "../../loading/slice/popularities/index";

export const popularMovieSelector = popularitiesAdopter.getSelectors(
  (state: RootState) => state.popularities.movies
);
export const popularTVsSelector = popularitiesAdopter.getSelectors(
  (state: RootState) => state.popularities.tvs
);
