import { RootState } from "../../../../store";
import { genreAdopter } from "./index";

export const movieGenresSelector = genreAdopter.getSelectors(
  (state: RootState) => state.genres.movie
);
export const tvGenresSelector = genreAdopter.getSelectors(
  (state: RootState) => state.genres.tv
);
