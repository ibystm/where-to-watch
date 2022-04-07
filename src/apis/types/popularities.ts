import { MovieListResults, TVListResults } from "./commons";

export type GetPopularMoviesAPIResponse = {
  page: number;
  results: MovieListResults[];
  total_results: number;
  total_pages: number;
};

export type GetPopularTVsAPIResponse = {
  page: number;
  results: TVListResults[];
  total_results: number;
  total_pages: number;
};
