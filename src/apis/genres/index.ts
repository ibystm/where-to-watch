import { baseRepository } from "../axios";
import { movieUrls, TvUrls } from "../endPoints";
import { GetMovieGenresResponse, GetTVGenresResponse } from "../types/genres";

export const getMovieGenres = async () => {
  const res = await baseRepository.get<GetMovieGenresResponse>(
    movieUrls.getGenres
  );
  return res.data;
};

export const getTVGenres = async () => {
  const res = await baseRepository.get<GetTVGenresResponse>(TvUrls.getGenres);
  return res.data;
};
