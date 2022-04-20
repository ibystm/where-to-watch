import { ActualContentData } from "./discovers";

export type SearchMovieState = {
  searchMode: boolean;
  keyword: string;
  searchedContents: ActualContentData[];
};
