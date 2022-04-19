import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieGenres, getTVGenres } from "../../../../apis/genres";
import { GenreState } from "../../../../types/redux/genres";

const GENRE_SLICE_NAME = "genres";

export const asyncActions = {
  getMovieGenres: createAsyncThunk(
    `genres/getMovieGenres`,
    async (_, { rejectWithValue }) => {
      try {
        return getMovieGenres();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  getTVGenres: createAsyncThunk(
    `genres/getTVGenres`,
    async (_, { rejectWithValue }) => {
      try {
        return getTVGenres();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

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
