export type MovieListResults = {
  // tmdbのものを全部記載しているわけではない
  id: number;
  adult?: boolean;
  overview?: string;
  original_title?: string;
  original_language?: string;
  title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  popularity?: number;
  video?: boolean;
  release_date?: string;
  genre_ids?: string[];
  vote_count?: number;
  vote_average?: number;
};

export type TVListResults = {
  poster_path?: string | null;
  popularity?: number;
  id: number;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  first_air_date?: string;
  origin_country?: string[];
  genre_ids?: string[];
  original_language?: string;
  vote_count?: number;
  name?: string;
  original_name?: string;
};

export type Dates = {
  maximum: number;
  minimum: number;
};
