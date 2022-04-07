import { MovieListResults, TVListResults } from "../../apis/types/commons";
import { ActualContentData } from "../../types/redux/discovers";

export const reducerFormatUtil = {
  movieListResultToReduxStoreData: (
    lists: MovieListResults[]
  ): ActualContentData[] => {
    return lists.map((item) => ({
      id: item.id,
      title: item.title,
      adult: item.adult,
      overview: item.overview,
      original_title: item.original_title,
      poster_path: item.poster_path ?? null,
      backdrop_path: item.backdrop_path ?? null,
      video: item.video,
      releaseDate: item.release_date,
      voteCoun: item.vote_count,
      voteAverage: item.vote_average,
      genre_ids: item.genre_ids,
    }));
  },

  tvListResultToReduxStoreData: (
    lists: TVListResults[]
  ): ActualContentData[] => {
    return lists.map(
      (item) =>
        ({
          id: item.id,
          genre_ids: item.genre_ids,
          title: item.name,
          poster_path: item.poster_path,
          releaseDate: item.first_air_date,
          overview: item.overview,
        } as ActualContentData)
    );
  },
};
