import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
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
    startLoading: (state, action: PayloadAction<string | undefined>) => {
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

export const loadingActions = {
  ...slice.actions,
};

export const { reducer } = slice;

export const selectLoadingState = (state: RootState) => state.loading.isLoading;
export const selectLoadingMessage = (state: RootState) =>
  state.loading.displayMessage;
