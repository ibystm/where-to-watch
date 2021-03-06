import { createSelector } from "reselect";
import { RootState } from "../../../../store";

export const contentsModeSelector = (state: RootState) => state.contentsMode;
export const modeIndexSelector = createSelector(
  contentsModeSelector,
  (mode) => mode.modeIndex
);
