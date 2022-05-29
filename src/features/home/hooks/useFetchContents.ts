import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions, AppDispatch, useSelector } from "../../../store";
import { ModeType } from "../../../types/redux/contentsMode";
import { usePageEndScrollObserve } from "./usePageEndScrollObserve";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );

  const { currentPage } = usePageEndScrollObserve();

  // for Genres
  useEffect(() => {
    const fetchGenres = (): void => {
      dispatch(actions.getMovieGenres());
      dispatch(actions.getTVGenres());
    };

    fetchGenres();
  }, [dispatch]);

  // for display contents
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (modeIndex === ModeType.Movie) {
        dispatch(actions.getPopularMovies(currentPage));
        dispatch(actions.fetchDiscoverMovies(selectedGenreId));
        return;
      }
      dispatch(actions.getPopularTVs(currentPage));
      dispatch(actions.fetchDiscoverTVs(selectedGenreId));
    };

    dispatch(actions.startLoading());
    fetch().finally(() => {
      dispatch(actions.endLoading());
    });
  }, [currentPage, dispatch, modeIndex, selectedGenreId]);
};
