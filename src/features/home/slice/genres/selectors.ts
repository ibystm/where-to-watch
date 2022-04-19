import { createSelector } from "reselect";
import { RootState } from "../../../../store/store";

export const genreSelector = (state: RootState) => state.genres;

export const tvGenresSelector = createSelector(
  genreSelector,
  (genre) => genre.tv
);
export const movieGenresSelector = createSelector(
  genreSelector,
  (genre) => genre.movie
);
