import { TVListResults } from "../../apis/types/discoverTVShows";

export type DiscoverTVShowsState = {
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  data: TVListResults[];
};
