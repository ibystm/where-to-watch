import { MovieListResults } from "./commons";

// TODO ファイル命名をcontentsにする

export type DiscoverMovieResponse = {
  page?: number;
  results?: MovieListResults[];
  total_results?: number;
  total_pages?: number;
};

type ProviderDetailInfo = {
  display_priority?: number;
  logo_path?: string;
  provider_id?: number;
  provider_name?: string;
};

export type WatchProviderResult = {
  link?: string;
  flatrate?: ProviderDetailInfo[];
  rent?: ProviderDetailInfo[];
  buy?: ProviderDetailInfo[];
};

export type GetWatchMovieProviderRespose = {
  id?: number;
  results: {
    JP: WatchProviderResult;
    [countryCode: string]: WatchProviderResult;
  };
};
