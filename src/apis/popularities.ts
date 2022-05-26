import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import {
  GetPopularMoviesAPIResponse,
  GetPopularTVsAPIResponse,
} from "./types/popularities";

export const getpopularMovies = async (
  page: number
): Promise<GetPopularMoviesAPIResponse> => {
  const res = await baseRepository.get(endPoints.getPopularMovies("JP", page));
  return res.data;
};

export const getPopularTVs = async (
  page: number
): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(endPoints.getPopularTVs("JP", page));
  return res.data;
};
