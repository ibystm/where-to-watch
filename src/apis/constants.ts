export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const requests = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
  discoverMovie: `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  discoverTVs: `/discover/tv?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  searchMovie: (keyword: string) =>
    `/search/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getMovieVideos: (movieId: string) =>
    `/movie/${movieId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getMovieGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getTVGenres: `/genre/movie/list?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  getUpComingMovie: (page: number = 1) =>
    `/movie/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&page=${page}`,
  getUpComingTVs: (page: number = 1) =>
    `/tv/upcoming?${languages.ja}&${API_KEY_QUERY_STRINGS}&page=${page}`,
  // getTrendings: (mediaType: MediaType, timeWindow: TimeWindow) => `/trending/${mediaType}/`
};
