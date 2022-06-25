import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeType } from "../../../../types/redux/contentsMode";
import { usePageEndScrollObserve } from "../../../home/hooks/usePageEndScrollObserve";
import { SearchMovieFormValues } from "../hooks/useSearchContentsByKeyword";

export const useSearchBox = (): typeof result => {
  const { resetSearchMode, searchMovie, searchTV, resetSearchedContents } =
    actions;
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit } =
    useFormikContext<SearchMovieFormValues>();
  const { currentPage } = usePageEndScrollObserve();

  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);

  useEffect(() => {
    // 0.5秒以上入力がない場合に、search requestをする
    const timerId = setTimeout(() => {
      if (values.searchName === "") {
        dispatch(resetSearchMode());
        return;
      }

      if (modeIndex === ModeType.Movie) {
        dispatch(
          searchMovie({ keyword: values.searchName, page: currentPage })
        );
      } else {
        dispatch(searchTV({ keyword: values.searchName, page: currentPage }));
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    currentPage,
    dispatch,
    modeIndex,
    resetSearchMode,
    searchMovie,
    searchTV,
    values.searchName,
  ]);

  useEffect(() => {
    dispatch(resetSearchedContents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeIndex, values.searchName]);

  const result = {
    handleChange,
    searchKeyword: values.searchName,
    handleSubmit,
  };
  return result;
};
