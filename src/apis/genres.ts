import { baseRepository } from "./axios";
import { requests } from "./constants";

export const getMovieGenres = async () => {
  try {
    const res = await baseRepository.get(requests.getMovieGenres);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getTVGenres = async () => {
  try {
    const res = await baseRepository.get(requests.getTVGenres);
    return res.data;
  } catch (e) {
    throw e;
  }
};
