import { ISOCodes31661 } from "../commons/constants/dictionaries";
export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const requests = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
  discoverMovie: (genreId: number) =>
    `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}`,
  discoverTVs: (genreId: number) =>
    `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&with_genres=${genreId}`,
  searchMovie: (keyword: string) =>
    `/search/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getMovieVideos: (movieId: string) =>
    `/movie/${movieId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getMovieGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getTVGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getUpComingMovie: (region: ISOCodes31661, page: number = 1) =>
    `/movie/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getPopularMovies: (region: ISOCodes31661, page: number = 1) =>
    `/movie/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,
  getPopularTVs: (region: ISOCodes31661, page: number = 1) =>
    `/tv/popular?${languages.ja}&${API_KEY_QUERY_STRINGS}&region=${region}&page=${page}`,

  // getUpComingTVs: (page: number = 1) =>
  //   `/tv/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&page=${page}`,
  // getTrendings: (mediaType: MediaType, timeWindow: TimeWindow) => `/trending/${mediaType}/`
};

export const TVURLs = {
  discover: `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  search: (keyword: string) =>
    `/search/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
};
