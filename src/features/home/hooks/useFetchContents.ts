import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../../store/store";
import { loadingActions } from "../../loading/slice/loading";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );

  const fetchGenres = (): void => {
    dispatch(genresActions.getMovieGenres());
    dispatch(genresActions.getTVGenres());
  };
  // for Genres
  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContents = useCallback(async () => {
    dispatch(popularitiesActions.getPopularMovies());
    dispatch(popularitiesActions.getPopularTVs());
    dispatch(contentsActions.fetchDiscoverMovies(selectedGenreId));
    dispatch(contentsActions.fetchDiscoverTVs(selectedGenreId));
  }, [selectedGenreId, dispatch]);

  // for display contents
  useEffect(() => {
    dispatch(loadingActions.startLoading());
    fetchContents().finally(() => {
      dispatch(loadingActions.endLoading());
    });
  }, [selectedGenreId, dispatch, modeIndex, fetchContents]);
};
