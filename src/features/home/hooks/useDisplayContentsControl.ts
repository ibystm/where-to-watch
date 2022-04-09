import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ActualContentData } from "../../../types/redux/discovers";
import { searchMovieSelectors } from "../../global/header/selectors/searchMovies";
import { contentsSelectors } from "../selectors/contents";
import { discoverTVShowsSelectors } from "../selectors/discoverTVShows";

type useDisplayContentsControlReturnType = {
  results: {
    loading: boolean;
    data: ActualContentData[];
  };
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    const isSearchMovieLoading = useSelector(searchMovieSelectors.loadingState);
    const discoverMovies = useSelector(contentsSelectors.selectContents);
    const discoverTVShows = useSelector(
      discoverTVShowsSelectors.discoverTVShows
    );
    const searchMovies = useSelector(searchMovieSelectors.searchedMovies);
    const popularTVs = useSelector(
      (state: RootState) => state.popularities.tvs
    );
    const popularMovies = useSelector(
      (state: RootState) => state.popularities.movies
    );
    const isLoadingDiscoverMovies = useSelector(
      contentsSelectors.selectLoadingState
    );
    const isLoadingdiscoverTVShows = useSelector(
      discoverTVShowsSelectors.isDiscoverTVShowsLoading
    );

    const [searchedContents, setSearchedContents] = useState<
      ActualContentData[]
    >([]);

    useEffect(() => {
      setSearchedContents(searchMovies);
    }, [searchMovies]);

    const results = useMemo(
      () => ({
        loading: false,
        data: popularMovies,
      }),
      [popularMovies]
    );

    return {
      results,
    };
  };
