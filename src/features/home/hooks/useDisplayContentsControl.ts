import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ActualContentData } from "../../../types/redux/discovers";
import { searchMovieSelectors } from "../../global/header/selectors/searchMovies";
import { contentsSelectors } from "../selectors/contents";

type useDisplayContentsControlReturnType = {
  displayContents: ActualContentData[];
  isLoading: boolean;
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    const isLoadingContents = useSelector(contentsSelectors.selectLoadingState);
    const searchMovieLoading = useSelector(searchMovieSelectors.loadingState);
    const searchMode = useSelector(searchMovieSelectors.searchMode);
    const contents = useSelector(contentsSelectors.selectContents);
    const searchMovies = useSelector(searchMovieSelectors.searchedMovies);
    const [displayContents, setDisplayContents] = useState<ActualContentData[]>(
      []
    );

    const shouldDislayTopContents = !searchMode && !isLoadingContents;
    const shoulDisplaySearchedContents = searchMode && !searchMovieLoading;

    const isLoading = useMemo(
      () => isLoadingContents || searchMovieLoading,
      [isLoadingContents, searchMovieLoading]
    );

    useEffect(() => {
      if (shouldDislayTopContents) {
        setDisplayContents(contents);
      }

      if (shoulDisplaySearchedContents) {
        setDisplayContents(searchMovies);
      }
    }, [
      contents,
      searchMovies,
      shoulDisplaySearchedContents,
      shouldDislayTopContents,
    ]);

    return {
      displayContents,
      isLoading,
    };
  };
