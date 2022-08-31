import { ISOCodes31661 } from "../commons/constants/dictionaries";
export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const commons = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
};

export const movieUrls = {
  discover: (genreId: number, page?: number) =>
    `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}&page=${page}`,
  search: (keyword: string, page?: number) =>
    `/search/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}&page=${page}`,
  getVideos: (movieId: number) =>
    `/movie/${movieId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getPopulars: (region: ISOCodes31661, page: number = 1) =>
    `/movie/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getWatchProvider: (movieId: number) =>
    `/movie/${movieId}/watch/providers?${API_KEY_QUERY_STRINGS}`,
  getDetail: (movieId: number) =>
    `/movie/${movieId}?${API_KEY_QUERY_STRINGS}&${languages.ja}`,
};

export const TvUrls = {
  discover: (genreId: number, page?: number) =>
    `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}&page=${page}`,
  search: (keyword: string, page?: number) =>
    `/search/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}&page=${page}`,
  getGenres: `/genre/tv/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getPopulars: (region: ISOCodes31661, page: number = 1) =>
    `/tv/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getWatchProvider: (tvId: number) =>
    `/tv/${tvId}/watch/providers?${API_KEY_QUERY_STRINGS}`,
  getVideos: (tvId: number) =>
    `/tv/${tvId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getDetail: (tvId: number) =>
    `/tv/${tvId}?${API_KEY_QUERY_STRINGS}&${languages.ja}`,
};
