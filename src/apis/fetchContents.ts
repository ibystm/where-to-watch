import { baseRepository } from "./axios";
import { requests } from "./constants";
import { DiscoverMovieResponse } from "./types/discovers";
import { DiscoverTVShowsResponse } from "./types/discoverTVShows";

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

export const fetchDiscoverTVsAPI = async (
  genreId: number
): Promise<DiscoverTVShowsResponse> => {
  try {
    const res = await baseRepository.get<DiscoverTVShowsResponse>(
      `${requests.discoverTVs(genreId)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};
