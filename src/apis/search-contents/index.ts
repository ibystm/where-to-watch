import { baseRepository } from "../axios";
import { endPoints, TVURLs } from "../constants";
import {
  SearchMoviesResponse,
  SearchTVsResponse,
} from "../types/searchContents";

export const searchMoviesAPI = async (
  keyword: string,
  page?: number
): Promise<SearchMoviesResponse> => {
  const res = await baseRepository.get(endPoints.searchMovie(keyword, page));
  return res.data;
};

export const searchTVAPI = async (
  keyword: string,
  page?: number
): Promise<SearchTVsResponse> => {
  const res = await baseRepository.get(TVURLs.search(keyword, page));
  return res.data;
};
