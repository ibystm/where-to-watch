import { useDispatch } from "react-redux";
import { searchMoviesActions } from "../slice/searchMovie";

export type SearchMovieFormValues = {
  searchName: string;
};

type UseSearchContentsByKeywordReturnType = {
  handleSubmit: (values: SearchMovieFormValues) => void;
};

export const useSearchMoviesByKeyword =
  (): UseSearchContentsByKeywordReturnType => {
    const dispatch = useDispatch();

    const handleSubmit = (values: SearchMovieFormValues): void => {
      if (!values.searchName) {
        console.log("No search movie name parameter");
        return;
      }

      dispatch(searchMoviesActions.searchMovies(values.searchName));
    };

    return {
      handleSubmit,
    };
  };
