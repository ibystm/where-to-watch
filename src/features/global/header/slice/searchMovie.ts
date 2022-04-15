import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMoviesAPI, searchTVAPI } from "../../../../apis/searchMovies";
import { SearchMovieState } from "../../../../types/redux/searchMovies";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "searcMovie";
export const initialState: SearchMovieState = {
  searchMode: false,
  keyword: "",
  loading: {
    isProcessing: false,
    message: null,
  },
  searchMovies: [],
};

const asyncActions = {
  searchMovie: createAsyncThunk(
    `${SLICE_NAME}/searchMovies`,
    async (keyword: string, { rejectWithValue }) => {
      try {
        return searchMoviesAPI(keyword);
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  searchTV: createAsyncThunk(
    `${SLICE_NAME}/searchTVs`,
    async (keyword: string, { rejectWithValue }) => {
      try {
        return searchTVAPI(keyword);
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetSearchMode: (state) => {
      state.searchMode = false;
      state.keyword = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchActions.searchMovie.pending, (state, { meta }) => {
      state.loading.isProcessing = true;
      state.searchMode = true;
      state.keyword = meta.arg;
    });
    builder.addCase(searchActions.searchMovie.fulfilled, (state, action) => {
      const { results } = action.payload;
      if (results === undefined) return;
      const searchMovies =
        reducerFormatUtil.movieListResultToReduxStoreData(results);
      state.searchMovies = searchMovies;
      state.loading.isProcessing = false;
    });
    builder.addCase(
      searchActions.searchMovie.rejected,
      (state, { payload }) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
    builder.addCase(searchActions.searchTV.pending, (state, { meta }) => {
      state.loading.isProcessing = true;
      state.searchMode = true;
      state.keyword = meta.arg;
    });
    builder.addCase(searchActions.searchTV.fulfilled, (state, { payload }) => {
      if (payload.results === undefined) return;
      state.searchMovies = reducerFormatUtil.tvListResultToReduxStoreData(
        payload.results
      );
      state.loading.isProcessing = false;
    });
  },
});

export const searchActions = {
  ...asyncActions,
  ...slice.actions,
};

export const { reducer } = slice;
