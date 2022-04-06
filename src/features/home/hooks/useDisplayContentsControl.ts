import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ActualContentData } from "../../../types/redux/discovers";
import { searchMovieSelectors } from "../../global/header/selectors/searchMovies";
import { contentsSelectors } from "../selectors/contents";
import { discoverTVShowsSelectors } from "../selectors/discoverTVShows";

type useDisplayContentsControlReturnType = {
  contentsList: {
    discoverMovies: {
      loading: boolean;
      contents: ActualContentData[];
    };
    discoverTVShows: {
      loading: boolean;
      contents: ActualContentData[];
    };
    searchedContents: {
      loading: boolean;
      contents: ActualContentData[];
    };
    upcomingMovies: {
      loading: boolean;
      contents: ActualContentData[];
    };
    popularMovies: {
      loading: boolean;
      contents: ActualContentData[];
    };
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
    const upcomingMovies = useSelector(
      (state: RootState) => state.upcomings.movie.data
    );
    const popularMovies = useSelector(
      (state: RootState) => state.popularities.movies
    );
    const isLoadingUpcomingMovie = useSelector(
      (state: RootState) => state.upcomings.movie.loading
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

    const contentsList = useMemo(
      () => ({
        discoverMovies: {
          loading: isLoadingDiscoverMovies,
          contents: discoverMovies,
        },
        discoverTVShows: {
          loading: isLoadingdiscoverTVShows,
          contents: discoverTVShows,
        },
        searchedContents: {
          loading: isSearchMovieLoading,
          contents: searchedContents,
        },
        upcomingMovies: {
          loading: isLoadingUpcomingMovie,
          contents: upcomingMovies,
        },
        popularMovies: {
          loading: false,
          contents: popularMovies,
        },
      }),
      [
        discoverMovies,
        discoverTVShows,
        isLoadingDiscoverMovies,
        isLoadingUpcomingMovie,
        isLoadingdiscoverTVShows,
        isSearchMovieLoading,
        popularMovies,
        searchedContents,
        upcomingMovies,
      ]
    );

    return {
      contentsList,
    };
  };
