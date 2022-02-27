export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const requests = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
  discoverMovie: `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
};

// TODO configuration APIから返却されたURLをしようするべき
// @see https://developers.themoviedb.org/3/configuration/get-api-configuration
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
