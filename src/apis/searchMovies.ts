import { baseRepository } from "./axios";
import { requests } from "./constants";
import { SearchMoviesResponse } from "./types/searchMovie";

export const searchMoviesAPI = async (
  keyword: string
): Promise<SearchMoviesResponse> => {
  try {
    const res = await baseRepository.get(requests.searchMovie(keyword));
    return res.data;
  } catch (e) {
    throw e;
  }
};
