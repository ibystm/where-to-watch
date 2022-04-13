import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModeType = "Movie" | "TV";

type ContentsMode = {
  mode: ModeType;
};

export const initialState: ContentsMode = {
  mode: "Movie",
};

const slice = createSlice({
  name: "contentsMode",
  initialState,
  reducers: {
    changeMode: (state, actions: PayloadAction<ModeType>) => {
      state.mode = actions.payload;
    },
  },
});

export const contentsModeReducer = slice;
