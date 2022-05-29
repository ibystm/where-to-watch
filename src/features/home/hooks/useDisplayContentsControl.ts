import { useMemo } from "react";
import { useSelector } from "../../../store";
import { ModeType } from "../../../types/redux/contentsMode";
import {
  popularMovieSelector,
  popularTVsSelector,
} from "../selectors/popularities";

export const useDisplayContentsControl = (): typeof result => {
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );
  const loading = useSelector((s) => s.loading.isLoading);
  const moviesByGenres = useSelector((state) => state.discovers.data);
  const tvsByGenres = useSelector((state) => state.discovers.data);
  const popularMovies = useSelector(popularMovieSelector.selectAll);
  const popularTVs = useSelector(popularTVsSelector.selectAll);
  const movies = selectedGenreId === 0 ? popularMovies : moviesByGenres;
  const tvs = selectedGenreId === 0 ? popularTVs : tvsByGenres;

  const result = useMemo(
    () => ({
      loading,
      data: modeIndex === ModeType.Movie ? movies : tvs,
    }),
    [loading, modeIndex, movies, tvs]
  );

  return result;
};
