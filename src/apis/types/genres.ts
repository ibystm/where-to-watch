import { Genre } from "../../types/redux/genres";

export type GetMovieGenresResponse = {
  genres: Genre[];
};

export type GetTVGenresResponse = GetMovieGenresResponse;
