import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import * as API from "../../../../apis/popularities";
import { ActualContentData } from "../../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "popularities";

export const popularitiesAdopter = createEntityAdapter<ActualContentData>();
const initialEntityState = popularitiesAdopter.getInitialState();
const initialState = {
  tvs: initialEntityState,
  movies: initialEntityState,
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.getPopularMovies.fulfilled,
      (state, { payload }) => {
        popularitiesAdopter.setAll(
          state.movies,
          reducerFormatUtil.movieListResultToReduxStoreData(payload.results)
        );
      }
    );
    builder.addCase(
      asyncActions.getPopularTVs.fulfilled,
      (state, { payload }) => {
        state.tvs = popularitiesAdopter.setAll(
          state.tvs,
          reducerFormatUtil.tvListResultToReduxStoreData(payload.results)
        );
      }
    );
  },
});
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

export const popularitiesReducer = slice.reducer;
export const popularitiesActions = {
  ...slice.actions,
  ...asyncActions,
};
