import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../../types/loading/loading";

const SLICE_NAME = "loading";

export const loadingInitialState: LoadingState = {
  isLoading: false,
  displayMessage: null,
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState: loadingInitialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      if (action.payload) {
        state.displayMessage = action.payload;
      }
    },
    endLoading: (state) => {
      state.isLoading = false;
      state.displayMessage = null;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export const { reducer } = slice;
