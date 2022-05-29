import { ISOCodes31661 } from "../commons/constants/dictionaries";
export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const endPoints = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
  discoverMovie: (genreId: number, page?: number) =>
    `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}&page=${page}`,
  discoverTVs: (genreId: number, page?: number) =>
    `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}&page=${page}`,
  searchMovie: (keyword: string, page?: number) =>
    `/search/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getMovieVideos: (movieId: string) =>
    `/movie/${movieId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getMovieGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getTVGenres: `/genre/tv/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getUpComingMovie: (region: ISOCodes31661, page: number = 1) =>
    `/movie/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getPopularMovies: (region: ISOCodes31661, page: number = 1) =>
    `/movie/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getPopularTVs: (region: ISOCodes31661, page: number = 1) =>
    `/tv/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getMovieWatchProvider: (movieId: number) =>
    `/movie/${movieId}/watch/providers?${API_KEY_QUERY_STRINGS}`,

  // getUpComingTVs: (page: number = 1) =>
  //   `/tv/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&page=${page}`,
  // getTrendings: (mediaType: MediaType, timeWindow: TimeWindow) => `/trending/${mediaType}/`
};

export const TVURLs = {
  discover: `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  search: (keyword: string) =>
    `/search/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getTVWatchProvider: (tvId: number) =>
    `/tv/${tvId}/watch/providers?${API_KEY_QUERY_STRINGS}`,
};
