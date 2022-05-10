import { baseRepository } from "./axios";
import { endPoints } from "./constants";

export const getMovieVideos = async (movieId: string) => {
  try {
    const res = await baseRepository.get(endPoints.getMovieVideos(movieId));
    return res.data;
  } catch (e) {
    throw e;
  }
};
