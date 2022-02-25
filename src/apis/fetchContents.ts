import { baseRepository } from "./axios";
import { API_KEY_QUERY_STRINGS, LANG_IS_JA } from "./constants";
import { DiscoverMovieResponse } from "./types/discovers";

export const fetchDiscoverMoviesAPI =
  async (): Promise<DiscoverMovieResponse> => {
    try {
      const res = await baseRepository.get<DiscoverMovieResponse>(
        `/discover/movie?${LANG_IS_JA}&${API_KEY_QUERY_STRINGS}`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  };
