import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../../store/store";
import { loadingActions } from "../../loading/slice/loading";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentgGenreId = useSelector(
    (state) => state.contentsMode.selectedGenreId
  );

  const fetchGenres = useCallback(() => {
    dispatch(genresActions.getMovieGenres());
    dispatch(genresActions.getTVGenres());
  }, [dispatch]);
  // for Genres
  React.useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // for display contents
  useEffect(() => {
    dispatch(loadingActions.startLoading());
    const fetchContents = async () => {
      dispatch(popularitiesActions.getPopularMovies());
      dispatch(popularitiesActions.getPopularTVs());
      dispatch(contentsActions.fetchDiscoverMovies(currentgGenreId));
    };
    fetchContents().finally(() => {
      dispatch(loadingActions.endLoading());
    });
  }, [currentgGenreId, dispatch]);
};
