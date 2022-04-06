import { baseRepository } from "./axios";
import { requests } from "./constants";
import { UpComingMoviesAPIResponse } from "./types/upcomings";

export const upcomingsAPI = {
  fetchUpcomingMovies: async (): Promise<UpComingMoviesAPIResponse> => {
    const res = await baseRepository.get(requests.getUpComingMovie("JP"));
    return res.data;
  },
};
