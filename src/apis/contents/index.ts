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
      `${movieUrls.discoverMovie(genreId, page)}`
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
      `${movieUrls.discoverTVs(genreId, page)}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getpopularMovies = async (
  page: number
): Promise<GetPopularMoviesAPIResponse> => {
  const res = await baseRepository.get(movieUrls.getPopularMovies("JP", page));
  return res.data;
};

export const getPopularTVs = async (
  page: number
): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(movieUrls.getPopularTVs("JP", page));
  return res.data;
};

export const getMovieWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  const res = await baseRepository.get<GetWatchMovieProviderRespose>(
    `${movieUrls.getMovieWatchProvider(movieId)}`
  );
  return res.data;
};

export const getTVWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  return baseRepository
    .get<GetWatchMovieProviderRespose>(`${TvUrls.getTVWatchProvider(movieId)}`)
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
