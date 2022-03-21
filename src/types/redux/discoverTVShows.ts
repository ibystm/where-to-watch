import { ActualContentData } from "./discovers";

export type DiscoverTVShowsState = {
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  data: ActualContentData[];
};
