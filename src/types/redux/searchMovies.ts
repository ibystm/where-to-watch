import { ActualContentData } from "./discovers";

export type SearchMovieState = {
  searchMode: boolean;
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  searchMovies: ActualContentData[];
};
