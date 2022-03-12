import { ActualContentData } from "./discovers";

export type SearchMovieState = {
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  searchMovies: ActualContentData[];
};
