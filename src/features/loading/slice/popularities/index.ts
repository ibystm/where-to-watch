import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../../../apis/popularities";
import { PopularitiesState } from "../../../../types/redux/popularities";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "popularities";

const asyncActions = {
  getPopularMovies: createAsyncThunk(
    `${SLICE_NAME}/getPopularMovies`,
    async (_, { rejectWithValue }) => {
      try {
        return API.getpopularMovies();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  getPopularTVs: createAsyncThunk(
    `${SLICE_NAME}/getPopularTVs`,
    async (_, { rejectWithValue }) => {
      try {
        return API.getPopularTVs();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

export const initialState: PopularitiesState = {
  tvs: [],
  movies: [],
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.getPopularMovies.fulfilled,
      (state, { payload }) => {
        state.movies = reducerFormatUtil.movieListResultToReduxStoreData(
          payload.results
        );
      }
    );
    builder.addCase(
      asyncActions.getPopularTVs.fulfilled,
      (state, { payload }) => {
        state.tvs = reducerFormatUtil.tvListResultToReduxStoreData(
          payload.results
        );
      }
    );
  },
});

export const popularitiesReducer = slice.reducer;
export const popularitiesActions = {
  ...slice.actions,
  ...asyncActions,
};
