import { baseRepository } from "./axios";
import { requests } from "./constants";
import { DiscoverTVShowsResponse } from "./types/discoverTVShows";

export const discoverMovieShowsResponse =
  async (): Promise<DiscoverTVShowsResponse> => {
    try {
      const res = await baseRepository.get<DiscoverTVShowsResponse>(
        requests.discoverTVs
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  };
