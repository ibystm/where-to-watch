import { ActualContentData } from "./discovers";

export type UpComingState = {
  movie: {
    loading: boolean;
    data: ActualContentData[];
  };
  tv: {
    loading: boolean;
    data: ActualContentData[];
  };
};
