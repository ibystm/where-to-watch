import { ActualContentData } from "../../types/redux/discovers";

export type SearchMovieState = {
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  searchMovies: ActualContentData[];
};
