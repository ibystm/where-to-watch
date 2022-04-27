import { useMemo } from "react";
import { useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { ActualContentData } from "../../../types/redux/discovers";
import {
  popularMovieSelector,
  popularTVsSelector,
} from "../selectors/popularities";

type useDisplayContentsControlReturnType = {
  results: {
    loading: boolean;
    data: ActualContentData[];
  };
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    const { modeIndex, selectedGenreId } = useSelector(
      (state) => state.contentsMode
    );
    const loading = useSelector((s) => s.loading.isLoading);
    const moviesByGenres = useSelector((state) => state.contents.data);
    const popularMovies = useSelector(popularMovieSelector.selectAll);
    const popularTVs = useSelector(popularTVsSelector.selectAll);
    const movie = selectedGenreId === 0 ? popularMovies : moviesByGenres;

    const results = useMemo(
      () => ({
        loading,
        data: modeIndex === ModeType.Movie ? movie : popularTVs,
      }),
      [loading, modeIndex, movie, popularTVs]
    );

    return {
      results,
    };
  };
