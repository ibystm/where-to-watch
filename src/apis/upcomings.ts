import { baseRepository } from "./axios";
import { requests } from "./constants";
import {
  UpComingMoviesAPIResponse,
  UpComingTVsAPIResponse,
} from "./types/upcomings";

export const upcomingsAPI = {
  fetchUpcomingMovies: async (): Promise<UpComingMoviesAPIResponse> => {
    try {
      const res = await baseRepository.get(requests.getUpComingMovie());
      return res.data;
    } catch (e) {
      throw e;
    }
  },
  fetchUpcomingTVs: async (): Promise<UpComingTVsAPIResponse> => {
    try {
      const res = await baseRepository.get(requests.getUpComingTVs());
      return res.data;
    } catch (e) {
      throw e;
    }
  },
};
