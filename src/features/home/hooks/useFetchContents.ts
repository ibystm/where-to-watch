import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { loadingActions } from "../../loading/slice/loading";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";
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
      dispatch(genresActions.getMovieGenres());
      dispatch(genresActions.getTVGenres());
    };

    fetchGenres();
  }, [dispatch]);

  // for display contents
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (modeIndex === ModeType.Movie) {
        dispatch(popularitiesActions.getPopularMovies(currentPage));
        dispatch(contentsActions.fetchDiscoverMovies(selectedGenreId));
        return;
      }
      dispatch(popularitiesActions.getPopularTVs(currentPage));
      dispatch(contentsActions.fetchDiscoverTVs(selectedGenreId));
    };

    dispatch(loadingActions.startLoading());
    fetch().finally(() => {
      dispatch(loadingActions.endLoading());
    });
  }, [currentPage, dispatch, modeIndex, selectedGenreId]);
};
