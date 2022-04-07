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
    popularTVs: {
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
        popularTVs: {
          loading: false,
          contents: popularTVs,
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
        isLoadingdiscoverTVShows,
        isSearchMovieLoading,
        popularMovies,
        popularTVs,
        searchedContents,
      ]
    );

    return {
      contentsList,
    };
  };
