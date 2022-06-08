export type FetchVideoApiResponse = {
  id: number;
  results?: GetVideoResult[];
};

export type GetVideoResult = {
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  key?: string;
  site?: string;
  size?: number;
  type?: string;
  official?: boolean;
  publisehd_at?: string;
  id?: string;
};
