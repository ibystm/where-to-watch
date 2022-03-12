import { useDispatch } from "react-redux";
import { searchMoviesActions } from "../slice/searchMovie";
type UseSearchContentsByKeyword = {
  serchByKeyword: (keyword: string) => Promise<void>;
};

export const useSearchMoviesByKeyword = (): UseSearchContentsByKeyword => {
  const dispatch = useDispatch();
  const serchByKeyword = async (keyword: string): Promise<void> => {
    dispatch(searchMoviesActions.searchMovies(keyword));
  };

  return {
    serchByKeyword,
  };
};
