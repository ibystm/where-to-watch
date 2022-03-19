import { useMemo } from "react";
import { useSelector } from "react-redux";
import { searchMovieSelectors } from "../../global/header/selectors/searchMovies";
import { contentsSelectors } from "../selectors/contents";

type useLoadingControlReturnType = {
  shouldDislayTopContents: boolean;
  shoulDisplaySearchedContents: boolean;
  isLoading: boolean;
};

export const useLoadingControl = (): useLoadingControlReturnType => {
  const isLoadingContents = useSelector(contentsSelectors.selectLoadingState);
  const searchMovieLoading = useSelector(searchMovieSelectors.loadingState);
  const searchMode = useSelector(searchMovieSelectors.searchMode);

  const shouldDislayTopContents = useMemo(
    () => !searchMode && !isLoadingContents,
    [isLoadingContents, searchMode]
  );

  const shoulDisplaySearchedContents = useMemo(
    () => searchMode && !searchMovieLoading,
    [searchMode, searchMovieLoading]
  );

  const isLoading = useMemo(
    () => isLoadingContents || searchMovieLoading,
    [isLoadingContents, searchMovieLoading]
  );

  return {
    shouldDislayTopContents,
    shoulDisplaySearchedContents,
    isLoading,
  };
};
