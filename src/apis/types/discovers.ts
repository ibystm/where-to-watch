import { MovieListResults } from "./commons";

export type DiscoverMovieResponse = {
  page?: number;
  results?: MovieListResults[];
  total_results?: number;
  total_pages?: number;
};
