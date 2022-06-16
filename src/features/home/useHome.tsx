import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions, AppDispatch, useSelector } from "../../store";
import { ModeType } from "../../types/redux/contentsMode";
import { usePageEndScrollObserve } from "./hooks/usePageEndScrollObserve";

export const useHome = (): typeof result => {
  const dispatch: AppDispatch = useDispatch();
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );
  const isSearchMode = useSelector((s) => s.searchContents.searchMode);
  const {
    getMovieGenres,
    getTVGenres,
    getPopularMovies,
    getPopularTVs,
    fetchDiscoverMovies,
    fetchDiscoverTVs,
    fetchConfigurations,
    resetDiscovers,
    resetPopularities,
  } = actions;

  const { currentPage } = usePageEndScrollObserve();

  const resetContents = (): void => {
    dispatch(resetDiscovers());
    dispatch(resetPopularities());
  };

  // fetch configs
  useEffect(() => {
    dispatch(fetchConfigurations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch genres
  useEffect(() => {
    const fetchGenres = (): void => {
      dispatch(getMovieGenres());
      dispatch(getTVGenres());
    };

    fetchGenres();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeIndex, selectedGenreId]);

  // for display contents
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (modeIndex === ModeType.Movie) {
        dispatch(getPopularMovies(currentPage));
        dispatch(
          fetchDiscoverMovies({
            genreId: selectedGenreId,
            page: currentPage,
          })
        );
      } else {
        dispatch(getPopularTVs(currentPage));
        dispatch(
          fetchDiscoverTVs({
            genreId: selectedGenreId,
            page: currentPage,
          })
        );
      }
    };

    dispatch(actions.startLoading());
    fetch().finally(() => {
      dispatch(actions.endLoading());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, modeIndex, selectedGenreId]);

  const result = {
    isSearchMode,
  };
  return result;
};
