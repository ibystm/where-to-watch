import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeType } from "../../../../types/redux/contentsMode";

export type SearchMovieFormValues = {
  searchName: string;
};

type UseSearchContentsByKeywordReturnType = {
  handleSubmit: (values: SearchMovieFormValues) => void;
};

export const useSearchMoviesByKeyword =
  (): UseSearchContentsByKeywordReturnType => {
    const dispatch = useDispatch();
    const modeIndex = useSelector((state) => state.contentsMode.modeIndex);

    const handleSubmit = (values: SearchMovieFormValues): void => {
      if (values.searchName === "") {
        console.log("No search movie name parameter");
        return;
      }
      if (modeIndex === ModeType.Movie) {
        dispatch(actions.searchMovie(values.searchName));
      } else {
        dispatch(actions.searchTV(values.searchName));
      }
    };

    return {
      handleSubmit,
    };
  };
