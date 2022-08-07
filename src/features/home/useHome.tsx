import { useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { actions, AppDispatch, useSelector } from "../../store";
import { FirestoreTypesHideHeaderPaths } from "../../types/db/firestoreTypesHideHeaderPaths";
import { ModeType } from "../../types/redux/contentsMode";
import { usePageEndScrollObserve } from "./hooks/usePageEndScrollObserve";

export const useHome = (): typeof result => {
  const dispatch: AppDispatch = useDispatch();
  const { modeIndex, selectedGenreId } = useSelector(
    (state) => state.contentsMode
  );
  const isSearchMode = useSelector((s) => s.searchContents.searchMode);
  const {
    getMovieGenres,
    getTVGenres,
    getPopularMovies,
    getPopularTVs,
    fetchDiscoverMovies,
    fetchDiscoverTVs,
    fetchConfigurations,
    resetDiscovers,
    resetPopularities,
    startLoading,
    endLoading,
    addHeaderHidePaths,
  } = actions;

  const { currentPage } = usePageEndScrollObserve();
  const [hideHeaderPathsDocs] =
    useCollectionDataOnce<FirestoreTypesHideHeaderPaths>(
      collectionReferences.hideHeaderPaths
    );

  const resetContents = (): void => {
    dispatch(resetDiscovers());
    dispatch(resetPopularities());
  };

  // fetch configs
  useEffect(() => {
    dispatch(fetchConfigurations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof hideHeaderPathsDocs === "undefined") return;
    const dataList = hideHeaderPathsDocs;
    dispatch(addHeaderHidePaths(dataList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideHeaderPathsDocs]);

  // fetch genres
  useEffect(() => {
    const fetchGenres = (): void => {
      dispatch(getMovieGenres());
      dispatch(getTVGenres());
    };

    fetchGenres();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeIndex, selectedGenreId]);

  // for display contents
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (modeIndex === ModeType.Movie) {
        dispatch(getPopularMovies(currentPage));
        dispatch(
          fetchDiscoverMovies({
            genreId: selectedGenreId,
            page: currentPage,
          })
        );
      } else {
        dispatch(getPopularTVs(currentPage));
        dispatch(
          fetchDiscoverTVs({
            genreId: selectedGenreId,
            page: currentPage,
          })
        );
      }
    };

    dispatch(startLoading());
    fetch().finally(() => {
      dispatch(endLoading());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, modeIndex, selectedGenreId]);

  const result = {
    isSearchMode,
  };
  return result;
};
