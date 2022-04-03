import { baseRepository } from "./axios";
import { requests } from "./constants";
import { GetMovieGenresResponse, GetTVGenresResponse } from "./types/genres";

export const getMovieGenres = async () => {
  try {
    const res = await baseRepository.get<GetMovieGenresResponse>(
      requests.getMovieGenres
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getTVGenres = async () => {
  try {
    const res = await baseRepository.get<GetTVGenresResponse>(
      requests.getTVGenres
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};
