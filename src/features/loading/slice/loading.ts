import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../types/loading/loading";

const SLICE_NAME = "loading";

export const loadingInitialState: LoadingState = {
  isLoading: false,
  displayMessage: null,
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState: loadingInitialState,
  reducers: {},
});

export const { reducer } = slice;
