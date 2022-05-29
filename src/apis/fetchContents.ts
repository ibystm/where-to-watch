import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import {
  DiscoverMovieResponse,
  GetWatchMovieProviderRespose,
} from "./types/discovers";
import { DiscoverTVShowsResponse } from "./types/discoverTVShows";

export const fetchDiscoverMovies = async (
  genreId: number,
  page?: number
): Promise<DiscoverMovieResponse> => {
  try {
    const res = await baseRepository.get<DiscoverMovieResponse>(
      `${endPoints.discoverMovie(genreId, page)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const fetchDiscoverTVs = async (
  genreId: number,
  page?: number
): Promise<DiscoverTVShowsResponse> => {
  try {
    const res = await baseRepository.get<DiscoverTVShowsResponse>(
      `${endPoints.discoverTVs(genreId, page)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getMovieWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  const res = await baseRepository.get<GetWatchMovieProviderRespose>(
    `${endPoints.getMovieWatchProvider(movieId)}`
  );
  return res.data;
};
