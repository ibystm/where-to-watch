import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import { UpComingMoviesAPIResponse } from "./types/upcomings";

export const upcomingsAPI = {
  fetchUpcomingMovies: async (): Promise<UpComingMoviesAPIResponse> => {
    const res = await baseRepository.get(endPoints.getUpComingMovie("JP"));
    return res.data;
  },
};
