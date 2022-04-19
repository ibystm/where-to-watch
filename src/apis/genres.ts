import { baseRepository } from "./axios";
import { requests } from "./constants";
import { GetMovieGenresResponse, GetTVGenresResponse } from "./types/genres";

export const getMovieGenres = async () => {
  const res = await baseRepository.get<GetMovieGenresResponse>(
    requests.getMovieGenres
  );
  return res.data;
};

export const getTVGenres = async () => {
  const res = await baseRepository.get<GetTVGenresResponse>(
    requests.getTVGenres
  );
  return res.data;
};
