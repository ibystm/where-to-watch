import { baseRepository } from "./axios";
import { requests } from "./constants";

export const searchMoviesAPI = async (keyword: string) => {
  try {
    const res = await baseRepository.get(requests.searchMovie(keyword));
    return res.data;
  } catch (e) {
    throw e;
  }
};
