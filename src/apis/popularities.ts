import { baseRepository } from "./axios";
import { requests } from "./constants";
import {
  GetPopularMoviesAPIResponse,
  GetPopularTVsAPIResponse,
} from "./types/popularities";

export const getpopularMovies =
  async (): Promise<GetPopularMoviesAPIResponse> => {
    const res = await baseRepository.get(requests.getPopularMovies("JP"));
    return res.data;
  };

export const getPopularTVs = async (): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(requests.getPopularTVs("JP"));
  return res.data;
};
