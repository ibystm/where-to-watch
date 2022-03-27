import { ActualContentData } from "./discovers";

export type SearchMovieState = {
  searchMode: boolean;
  keyword: string;
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  searchMovies: ActualContentData[];
};
