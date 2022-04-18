export const ModeType = {
  Movie: 0,
  TV: 1,
} as const;

export type ContentsMode = {
  modeIndex: typeof ModeType.Movie | typeof ModeType.TV;
};
