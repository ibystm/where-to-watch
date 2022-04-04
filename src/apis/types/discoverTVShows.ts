import { TVListResults } from "./commons";

export type DiscoverTVShowsResponse = {
  page?: number;
  results?: TVListResults[];
  total_results?: number;
  total_pages?: number;
};
