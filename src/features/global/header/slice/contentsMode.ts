import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ContentsMode,
  ModeIndex,
  ModeType,
} from "../../../../types/redux/contentsMode";

export const initialState: ContentsMode = {
  modeIndex: ModeType.Movie,
  selectedGenreId: 0,
};

const slice = createSlice({
  name: "contentsMode",
  initialState,
  reducers: {
    changeMode: (state, actions: PayloadAction<ModeIndex>) => {
      state.modeIndex = actions.payload;
    },
    selectGenre: (state, action: PayloadAction<number>) => {
      state.selectedGenreId = action.payload;
    },
  },
});

export const contentModeActions = slice.actions;
export const contentsModeReducer = slice.reducer;
