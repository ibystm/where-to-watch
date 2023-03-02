import { baseRepository } from "../axios";
import { movieUrls, TvUrls } from "../endPoints";
import {
  SearchMoviesResponse,
  SearchTVsResponse,
} from "../types/searchContents";

export const searchMoviesAPI = async (
  keyword: string,
  page?: number
): Promise<SearchMoviesResponse> => {
  const res = await baseRepository.get(movieUrls.search(keyword, page));
  return res.data;
};

export const searchTVAPI = async (
  keyword: string,
  page?: number
): Promise<SearchTVsResponse> => {
  const res = await baseRepository.get(TvUrls.search(keyword, page));
  return res.data;
};
