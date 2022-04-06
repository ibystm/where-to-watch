import { MovieListResults } from "./commons";

export type GetPopularMoviesAPIResponse = {
  page: number;
  results: MovieListResults[];
  total_results: number;
  total_pages: number;
};
