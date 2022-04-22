export const ModeType = {
  Movie: 0,
  TV: 1,
} as const;

export type ModeIndex = typeof ModeType.Movie | typeof ModeType.TV;

export type ContentsMode = {
  modeIndex: ModeIndex;
  selectedGenreId: number;
};
