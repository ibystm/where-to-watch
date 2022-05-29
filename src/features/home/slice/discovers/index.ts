import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../../../apis/fetchContents";
import { DiscoverMovieResponse } from "../../../../apis/types/discovers";
import { DiscoverTVShowsResponse } from "../../../../apis/types/discoverTVShows";
import { ContentsState } from "../../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "contents";
export const initialState: ContentsState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  data: [],
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
    builder.addCase(asyncActions.fetchDiscoverMovies.pending, (state) => {
      state.loading.isProcessing = true;
    });
    builder.addCase(
      asyncActions.fetchDiscoverMovies.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (typeof results !== "undefined") {
            state.data =
              reducerFormatUtil.movieListResultToReduxStoreData(results);
          }
        }
        state.loading.isProcessing = false;
      }
    );
    builder.addCase(
      asyncActions.fetchDiscoverMovies.rejected,
      (state, payload) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
    builder.addCase(asyncActions.fetchDiscoverTVs.pending, (state) => {
      state.loading.isProcessing = true;
    });
    builder.addCase(
      asyncActions.fetchDiscoverTVs.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (typeof results !== "undefined") {
            state.data =
              reducerFormatUtil.tvListResultToReduxStoreData(results);
          }
        }
        // state.loading.isProcessing = false;
      }
    );
    builder.addCase(
      asyncActions.fetchDiscoverTVs.rejected,
      (state, payload) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
  },
});

export const contentsActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;
