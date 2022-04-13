import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsMode } from "../../../../types/redux/contentsMode";

export const initialState: ContentsMode = {
  modeIndex: 0,
};

const slice = createSlice({
  name: "contentsMode",
  initialState,
  reducers: {
    changeMode: (state, actions: PayloadAction<number>) => {
      state.modeIndex = actions.payload;
    },
  },
});

export const contentModeActions = slice.actions;
export const contentsModeReducer = slice.reducer;
