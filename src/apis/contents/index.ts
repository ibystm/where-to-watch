import { baseRepository } from "../axios";
import { endPoints, TVURLs } from "../constants";
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

export const getpopularMovies = async (
  page: number
): Promise<GetPopularMoviesAPIResponse> => {
  const res = await baseRepository.get(endPoints.getPopularMovies("JP", page));
  return res.data;
};

export const getPopularTVs = async (
  page: number
): Promise<GetPopularTVsAPIResponse> => {
  const res = await baseRepository.get(endPoints.getPopularTVs("JP", page));
  return res.data;
};

export const getMovieWatchProvider = async (
  movieId: number
): Promise<GetWatchMovieProviderRespose> => {
  const res = await baseRepository.get<GetWatchMovieProviderRespose>(
    `${endPoints.getMovieWatchProvider(movieId)}`
  );
  return res.data;
};

export const getMovieVideos = async (movieId: number) => {
  baseRepository
    .get<FetchVideoApiResponse>(`${endPoints.getVideos(movieId)}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const getTvVideos = async (movieId: number) => {
  baseRepository
    .get<FetchVideoApiResponse>(`${TVURLs.getVideos(movieId)}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};
