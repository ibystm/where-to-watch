import { baseRepository } from "./axios";
import { requests } from "./constants";

export const getMovieVideos = async (movieId: string) => {
  try {
    const res = await baseRepository.get(requests.getMovieVideos(movieId));
    return res.data;
  } catch (e) {
    throw e;
  }
};
