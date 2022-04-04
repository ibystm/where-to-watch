import { Dates, MovieListResults } from "./commons";

export type UpComingMoviesAPIResponse = {
  page: number;
  results: MovieListResults[];
  dates: Dates;
  total_pages: number;
  totao_results: number;
};

export type UpComingTVsAPIResponse = UpComingMoviesAPIResponse;
