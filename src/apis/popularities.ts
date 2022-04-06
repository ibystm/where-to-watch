import { baseRepository } from "./axios";
import { requests } from "./constants";
import { GetPopularMoviesAPIResponse } from "./types/popularities";

export const getpopularMovies =
  async (): Promise<GetPopularMoviesAPIResponse> => {
    const res = await baseRepository.get(requests.getPopularMovies("JP"));
    return res.data;
  };
