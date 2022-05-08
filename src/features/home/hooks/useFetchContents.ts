import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { loadingActions } from "../../loading/slice/loading";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );

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
        dispatch(popularitiesActions.getPopularMovies());
        dispatch(contentsActions.fetchDiscoverMovies(selectedGenreId));
        return;
      }
      dispatch(popularitiesActions.getPopularTVs());
      dispatch(contentsActions.fetchDiscoverTVs(selectedGenreId));
    };

    dispatch(loadingActions.startLoading());
    fetch().finally(() => {
      dispatch(loadingActions.endLoading());
    });
  }, [dispatch, modeIndex, selectedGenreId]);
};
