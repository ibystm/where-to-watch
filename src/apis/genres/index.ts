import { baseRepository } from "../axios";
import { movieUrls } from "../endPoints";
import { GetMovieGenresResponse, GetTVGenresResponse } from "../types/genres";

export const getMovieGenres = async () => {
  const res = await baseRepository.get<GetMovieGenresResponse>(
    movieUrls.getMovieGenres
  );
  return res.data;
};

export const getTVGenres = async () => {
  const res = await baseRepository.get<GetTVGenresResponse>(
    movieUrls.getTVGenres
  );
  return res.data;
};
