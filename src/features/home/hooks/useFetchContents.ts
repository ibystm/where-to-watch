import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../../store/store";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";
import { upcomingActions } from "../slice/upcomings/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentgGenreId = useSelector(
    (state) => state.contentsMode.selectedGenreId
  );
  const fetchContents = useCallback(() => {
    dispatch(genresActions.getMovieGenres());
    dispatch(genresActions.getTVGenres());
    dispatch(upcomingActions.fetchUpcomingMovies());
    dispatch(popularitiesActions.getPopularMovies());
    dispatch(popularitiesActions.getPopularTVs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(contentsActions.fetchDiscoverMovies(currentgGenreId));
  }, [currentgGenreId, dispatch]);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);
};
