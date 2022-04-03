import { createSlice } from "@reduxjs/toolkit";
import { GenreState } from "../../../../types/redux/genres";
import { asyncActions } from "./asyncActions";

const GENRE_SLICE_NAME = "genres";

const initialState: GenreState = {
  tv: [],
  movie: [],
};

const slice = createSlice({
  name: GENRE_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.getMovieGenres.fulfilled,
      (state, { payload }) => {
        state.movie = payload.genres;
      }
    );
    builder.addCase(
      asyncActions.getMovieGenres.rejected,
      (state, { payload }) => {
        throw payload;
      }
    );
    builder.addCase(
      asyncActions.getTVGenres.fulfilled,
      (state, { payload }) => {
        state.tv = payload.genres;
      }
    );
    builder.addCase(asyncActions.getTVGenres.rejected, (state, { payload }) => {
      throw payload;
    });
  },
});

export const genresReducer = slice.reducer;
export const genresActions = {
  ...slice.actions,
  ...asyncActions,
};
