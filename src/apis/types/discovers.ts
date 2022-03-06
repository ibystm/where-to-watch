export type DiscoverMovieResponse = {
  page?: number;
  results?: DiscoverMovieResults[];
  total_results?: number;
  total_pages?: number;
};

export type DiscoverMovieResults = {
  // tmdbのものを全部記載しているわけではない
  id?: number;
  adult?: boolean;
  overview?: string;
  original_title?: string;
  original_language?: string;
  title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  popularity?: number;
  video?: boolean;
};
