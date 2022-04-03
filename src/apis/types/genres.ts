import { Genres } from "../../types/redux/genres";

export type GetMovieGenresResponse = {
  genres: Genres[];
};

export type GetTVGenresResponse = GetMovieGenresResponse;
