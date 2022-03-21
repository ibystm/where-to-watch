import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ActualContentData } from "../../../types/redux/discovers";
import { searchMovieSelectors } from "../../global/header/selectors/searchMovies";
import { contentsSelectors } from "../selectors/contents";
import { discoverTVShowsSelectors } from "../selectors/discoverTVShows";

type useDisplayContentsControlReturnType = {
  displayContents: ActualContentData[];
  isLoading: boolean;
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    // ===== selectors =====
    const isLoadingContents = useSelector(contentsSelectors.selectLoadingState);
    const searchMovieLoading = useSelector(searchMovieSelectors.loadingState);
    const searchMode = useSelector(searchMovieSelectors.searchMode);
    const contents = useSelector(contentsSelectors.selectContents);
    const searchMovies = useSelector(searchMovieSelectors.searchedMovies);
    const discoverTVShows = useSelector(
      discoverTVShowsSelectors.discoverTVShows
    );
    const isLoadingdiscoverTVShows = useSelector(
      discoverTVShowsSelectors.isDiscoverTVShowsLoading
    );
    // =====  =====

    const [displayContents, setDisplayContents] = useState<ActualContentData[]>(
      []
    );

    const shouldDislayTopContents =
      !searchMode && !isLoadingContents && !isLoadingdiscoverTVShows;
    const shoulDisplaySearchedContents = searchMode && !searchMovieLoading;

    const isLoading = useMemo(
      () => isLoadingContents || searchMovieLoading || isLoadingdiscoverTVShows,
      [isLoadingContents, isLoadingdiscoverTVShows, searchMovieLoading]
    );

    useEffect(() => {
      if (shouldDislayTopContents) {
        // TODO: 一緒に表示させる必要はなし
        const res = [...contents, ...discoverTVShows];
        setDisplayContents(res);
      }

      if (shoulDisplaySearchedContents) {
        setDisplayContents(searchMovies);
      }
    }, [
      contents,
      discoverTVShows,
      searchMovies,
      shoulDisplaySearchedContents,
      shouldDislayTopContents,
    ]);

    return {
      displayContents,
      isLoading,
    };
  };
