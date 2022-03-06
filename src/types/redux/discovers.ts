export type ContentsState = {
  loading: {
    isProcessing: boolean;
    message: string | null;
  };
  data: ActualContentData[];
};

export type ActualContentData = {
  id?: number;
  adult?: boolean;
  overview?: string;
  original_title?: string;
  original_language?: string;
  title?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  video?: boolean;
};
