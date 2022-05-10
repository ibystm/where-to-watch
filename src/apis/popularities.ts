import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import {
  GetPopularMoviesAPIResponse,
  GetPopularTVsAPIResponse,
} from "./types/popularities";

export const getpopularMovies =
  async (): Promise<GetPopularMoviesAPIResponse> => {
    const res = await baseRepository.get(endPoints.getPopularMovies("JP"));
    return res.data;
  };

export const getPopularTVs = async (): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(endPoints.getPopularTVs("JP"));
  return res.data;
};
