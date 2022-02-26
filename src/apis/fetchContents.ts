import { baseRepository } from "./axios";
import { requests } from "./constants";
import { DiscoverMovieResponse } from "./types/discovers";

export const fetchDiscoverMoviesAPI =
  async (): Promise<DiscoverMovieResponse> => {
    try {
      const res = await baseRepository.get<DiscoverMovieResponse>(
        `${requests.discoverMovie}`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  };
