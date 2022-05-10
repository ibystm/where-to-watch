import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import { GetMovieGenresResponse, GetTVGenresResponse } from "./types/genres";

export const getMovieGenres = async () => {
  const res = await baseRepository.get<GetMovieGenresResponse>(
    endPoints.getMovieGenres
  );
  return res.data;
};

export const getTVGenres = async () => {
  const res = await baseRepository.get<GetTVGenresResponse>(
    endPoints.getTVGenres
  );
  return res.data;
};
