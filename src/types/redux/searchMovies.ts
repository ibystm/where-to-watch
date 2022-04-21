import { ActualContentData } from "./discovers";

export type SearchContentsState = {
  searchMode: boolean;
  keyword: string;
  searchedContents: ActualContentData[];
};
