import { baseRepository } from "./axios";
import { requests, TVURLs } from "./constants";
import {
  SearchMoviesResponse,
  SearchTVsResponse,
} from "./types/searchContents";

export const searchMoviesAPI = async (
  keyword: string
): Promise<SearchMoviesResponse> => {
  const res = await baseRepository.get(requests.searchMovie(keyword));
  return res.data;
};

export const searchTVAPI = async (
  keyword: string
): Promise<SearchTVsResponse> => {
  const res = await baseRepository.get(TVURLs.search(keyword));
  return res.data;
};
