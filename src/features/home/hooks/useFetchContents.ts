import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { popularitiesActions } from "../../loading/slice/popularities/index";
import { contentsActions } from "../slice/discoverMovies";
import { genresActions } from "../slice/genres/index";
import { upcomingActions } from "../slice/upcomings/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchContents = useCallback(() => {
    dispatch(genresActions.getMovieGenres());
    dispatch(genresActions.getTVGenres());
    dispatch(contentsActions.fetchDiscoverMovies());
    dispatch(upcomingActions.fetchUpcomingMovies());
    dispatch(popularitiesActions.getPopularMovies());
    dispatch(popularitiesActions.getPopularTVs());
  }, [dispatch]);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);
};
