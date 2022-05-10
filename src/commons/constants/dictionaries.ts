// TODO
export const commonDictionaries = {
  noTitle: "タイトルなし",
  noReleaseDate: "リリース日不明",
  noImageIcon: "No Image",
  titleName: "タイトル名",
  discoverMovie: "Discover/映画",
  discoverTVShows: "Discover/テレビ・ドラマ",
  upconmingMovies: "近日公開予定映画",
  popular: "人気",
  popuolarMovies: "人気映画",
  popularTVs: "人気テレビドラマ",
  history: "歴史", // historyが履歴と訳された状態になってしまうため
  noOverview: "現在この作品のあらすじは見つかりません",
};

export const ISO_3166_1_CODES = {
  JAPAN: "JP",
} as const;

export type ISOCodes31661 =
  typeof ISO_3166_1_CODES[keyof typeof ISO_3166_1_CODES];
