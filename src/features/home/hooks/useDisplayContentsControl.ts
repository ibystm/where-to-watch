import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
    searchedContents: ActualContentData[];
  };
  isLoading: boolean;
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    // ===== selectors =====
    const searchMovieLoading = useSelector(searchMovieSelectors.loadingState);
    const searchMode = useSelector(searchMovieSelectors.searchMode);
    const discoverMovies = useSelector(contentsSelectors.selectContents);
    const discoverTVShows = useSelector(
      discoverTVShowsSelectors.discoverTVShows
    );
    const searchMovies = useSelector(searchMovieSelectors.searchedMovies);
    const isLoadingDiscoverMovies = useSelector(
      contentsSelectors.selectLoadingState
    );
    const isLoadingdiscoverTVShows = useSelector(
      discoverTVShowsSelectors.isDiscoverTVShowsLoading
    );
    // =====  =====

    const [searchedContents, setSearchedContents] = useState<
      ActualContentData[]
    >([]);

    const shoulDisplaySearchedContents = searchMode && !searchMovieLoading;

    const isLoading = useMemo(
      () =>
        isLoadingDiscoverMovies ||
        searchMovieLoading ||
        isLoadingdiscoverTVShows,
      [isLoadingDiscoverMovies, isLoadingdiscoverTVShows, searchMovieLoading]
    );

    useEffect(() => {
      // if (shouldDislayTopContents) {
      //   // TODO: 一緒に表示させる必要はなし
      //   const res = [...contents, ...discoverTVShows];
      //   setDisplayContents(res);
      // }

      if (shoulDisplaySearchedContents) {
        setSearchedContents(searchMovies);
      }
    }, [discoverTVShows, searchMovies, shoulDisplaySearchedContents]);

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
        searchedContents,
      }),
      [
        discoverMovies,
        discoverTVShows,
        isLoadingDiscoverMovies,
        isLoadingdiscoverTVShows,
        searchedContents,
      ]
    );

    return {
      contentsList,
      isLoading,
    };
  };
