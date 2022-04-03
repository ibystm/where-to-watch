import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { contentsActions } from "../slice/discoverMovies";
import { discoverTVShowsActions } from "../slice/discoverTVs";
import { genresActions } from "../slice/genres/index";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchContents = useCallback(() => {
    dispatch(genresActions.getMovieGenres());
    dispatch(genresActions.getTVGenres());
    dispatch(contentsActions.fetchDiscoverMovies());
    dispatch(discoverTVShowsActions.discoverTVShows());
  }, [dispatch]);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);
};
