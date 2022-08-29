import { Genre } from "../../types/redux/genres";

export type ContentDetail = {
  id: number;
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: Genre[];
  homepage?: string | null;
  imdb_id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  production_countries?: {
    iso_3166_1?: string;
    name?: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: {
    iso_639_1?: string;
    name?: string;
  };
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_aberage?: number;
  vote_count?: number;
};
