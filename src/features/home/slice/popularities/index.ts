import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import * as API from "../../../../apis/contents";
import {
  GetPopularMoviesAPIResponse,
  GetPopularTVsAPIResponse,
} from "../../../../apis/types/popularities";
import { ActualContentData } from "../../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "popularities";

export const popularitiesAdopter = createEntityAdapter<ActualContentData>();
const initialEntityState = popularitiesAdopter.getInitialState();
const initialState = {
  tvs: initialEntityState,
  movies: initialEntityState,
};

const asyncActions = {
  getPopularMovies: createAsyncThunk<GetPopularMoviesAPIResponse, number>(
    `${SLICE_NAME}/getPopularMovies`,
    async (page, { rejectWithValue }) => {
      try {
        return API.getpopularMovies(page);
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  getPopularTVs: createAsyncThunk<GetPopularTVsAPIResponse, number>(
    `${SLICE_NAME}/getPopularTVs`,
    async (page, { rejectWithValue }) => {
      try {
        return API.getPopularTVs(page);
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetPopularities: (state) => {
      popularitiesAdopter.removeAll(state.movies);
      popularitiesAdopter.removeAll(state.tvs);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.getPopularMovies.fulfilled,
      (state, { payload }) => {
        popularitiesAdopter.addMany(
          state.movies,
          reducerFormatUtil.movieListResultToReduxStoreData(payload.results)
        );
      }
    );
    builder.addCase(
      asyncActions.getPopularTVs.fulfilled,
      (state, { payload }) => {
        state.tvs = popularitiesAdopter.addMany(
          state.tvs,
          reducerFormatUtil.tvListResultToReduxStoreData(payload.results)
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
