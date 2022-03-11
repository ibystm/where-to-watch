import { createSlice } from "@reduxjs/toolkit";
import { SearchMovieState } from "../../../../apis/types/searchMovie";

const SLICE_NAME = "searcMovie";
const initialState: SearchMovieState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  searchMovies: [],
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
