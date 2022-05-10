import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import { DiscoverTVShowsResponse } from "./types/discoverTVShows";

export const discoverMovieShowsAPI = async (
  genreId: number
): Promise<DiscoverTVShowsResponse> => {
  const res = await baseRepository.get<DiscoverTVShowsResponse>(
    endPoints.discoverTVs(genreId)
  );
  return res.data;
};
