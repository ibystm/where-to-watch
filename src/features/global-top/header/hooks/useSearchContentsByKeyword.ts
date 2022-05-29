import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeType } from "../../../../types/redux/contentsMode";

export type SearchMovieFormValues = {
  searchName: string;
};

export const useSearchMoviesByKeyword = (): typeof result => {
  const dispatch = useDispatch();
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);

  const handleSubmit = (values: SearchMovieFormValues): void => {
    if (values.searchName.length === 0) {
      return;
    }
    if (modeIndex === ModeType.Movie) {
      dispatch(actions.searchMovie(values.searchName));
    } else {
      dispatch(actions.searchTV(values.searchName));
    }
  };

  const result = {
    handleSubmit,
  };

  return result;
};
