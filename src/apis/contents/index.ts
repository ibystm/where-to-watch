import { baseRepository } from "../axios";
import { movieUrls, TvUrls } from "../endPoints";
import {
  DiscoverMovieResponse,
  GetWatchMovieProviderRespose,
} from "../types/discovers";
import { DiscoverTVShowsResponse } from "../types/discoverTVShows";
import { FetchVideoApiResponse } from "../types/getVideos";
import {
  GetPopularMoviesAPIResponse,
  GetPopularTVsAPIResponse,
} from "../types/popularities";

export const fetchDiscoverMovies = async (
  genreId: number,
  page?: number
): Promise<DiscoverMovieResponse> => {
  try {
    const res = await baseRepository.get<DiscoverMovieResponse>(
      `${movieUrls.discover(genreId, page)}`
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
      `${TvUrls.discover(genreId, page)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getpopularMovies = async (
  page: number
): Promise<GetPopularMoviesAPIResponse> => {
  const res = await baseRepository.get(movieUrls.getPopulars("JP", page));
  return res.data;
};

export const getPopularTVs = async (
  page: number
): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(TvUrls.getPopulars("JP", page));
  return res.data;
};

export const getMovieWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  const res = await baseRepository.get<GetWatchMovieProviderRespose>(
    `${movieUrls.getWatchProvider(movieId)}`
  );
  return res.data;
};

export const getTVWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  return baseRepository
    .get<GetWatchMovieProviderRespose>(`${TvUrls.getWatchProvider(movieId)}`)
    .then((res) => res.data);
};

export const getMovieVideos = async (movieId: number) => {
  return baseRepository
    .get<FetchVideoApiResponse>(`${movieUrls.getVideos(movieId)}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const getTvVideos = async (movieId: number) => {
  return baseRepository
    .get<FetchVideoApiResponse>(`${TvUrls.getVideos(movieId)}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};
