export type ContentsState = {
  data: ActualContentData[];
};

export type ActualContentData = {
  id: number; // 一旦optional外してみる
  adult?: boolean;
  overview?: string;
  original_title?: string;
  original_language?: string;
  title?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  video?: boolean;
  release_date?: string;
  voteCount?: number;
  voteAverage?: number;
  genre_ids?: string[];
};
