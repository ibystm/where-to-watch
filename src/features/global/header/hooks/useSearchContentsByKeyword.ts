import { useDispatch } from "react-redux";
import { searchMoviesActions } from "../slice/searchMovie";

export type SearchMovieFormValues = {
  searchName: string;
};

type UseSearchContentsByKeywordReturnType = {
  handleSubmit: (values: SearchMovieFormValues) => void;
  onEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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

    const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        alert(e.currentTarget.value);
      }
    };

    return {
      handleSubmit,
      onEnterKeyDown,
    };
  };
