import { baseRepository } from "./axios";
import { requests } from "./constants";
import { DiscoverMovieResponse } from "./types/discovers";

export const fetchDiscoverMoviesAPI = async (
  genreId: number
): Promise<DiscoverMovieResponse> => {
  try {
    const res = await baseRepository.get<DiscoverMovieResponse>(
      `${requests.discoverMovie(genreId)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};
