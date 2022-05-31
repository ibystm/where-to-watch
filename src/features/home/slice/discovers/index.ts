import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import * as API from "../../../../apis/contents";
import { DiscoverMovieResponse } from "../../../../apis/types/discovers";
import { DiscoverTVShowsResponse } from "../../../../apis/types/discoverTVShows";
import { RootState } from "../../../../store/index";
import { ActualContentData } from "../../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "contents";

export const discoversAdopter = createEntityAdapter<ActualContentData>();
const initialEntityState = discoversAdopter.getInitialState();

export const initialState = {
  tvs: initialEntityState,
  movies: initialEntityState,
};

const asyncActions = {
  fetchDiscoverMovies: createAsyncThunk<
    DiscoverMovieResponse,
    { genreId: number; page?: number }
  >(
    `${SLICE_NAME}/fetchDiscoverMovies`,
    async ({ genreId, page }, { rejectWithValue }) => {
      try {
        const res = await API.fetchDiscoverMovies(genreId, page);
        return res;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  fetchDiscoverTVs: createAsyncThunk<
    DiscoverTVShowsResponse,
    { genreId: number; page?: number }
  >(
    `${SLICE_NAME}/fetchDiscoverTVs`,
    async ({ genreId, page }, { rejectWithValue }) => {
      try {
        const res = await API.fetchDiscoverTVs(genreId, page);
        return res;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.fetchDiscoverMovies.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (typeof results === "undefined") return;

          discoversAdopter.addMany(
            state.movies,
            reducerFormatUtil.movieListResultToReduxStoreData(results)
          );
        }
      }
    );
    builder.addCase(asyncActions.fetchDiscoverMovies.rejected, (_, payload) => {
      throw payload;
    });
    builder.addCase(
      asyncActions.fetchDiscoverTVs.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (typeof results === "undefined") return;
          discoversAdopter.addMany(
            state.tvs,
            reducerFormatUtil.tvListResultToReduxStoreData(results)
          );
        }
      }
    );
    builder.addCase(asyncActions.fetchDiscoverTVs.rejected, (_, payload) => {
      throw payload;
    });
  },
});

export const contentsActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;

export const discoverMoviesSelector = discoversAdopter.getSelectors(
  (state: RootState) => state.discovers.movies
);
export const discoverTVsSelector = discoversAdopter.getSelectors(
  (state: RootState) => state.discovers.tvs
);
