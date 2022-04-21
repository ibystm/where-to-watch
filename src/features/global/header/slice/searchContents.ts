import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMoviesAPI, searchTVAPI } from "../../../../apis/searchMovies";
import type { SearchContentsState } from "../../../../types/redux/searchMovies";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "searcContents";
export const initialState: SearchContentsState = {
  searchMode: false,
  keyword: "",
  searchedContents: [],
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
      state.searchMode = true;
      state.keyword = meta.arg;
    });
    builder.addCase(searchActions.searchMovie.fulfilled, (state, action) => {
      const { results } = action.payload;
      if (results === undefined) return;
      const searchMovies =
        reducerFormatUtil.movieListResultToReduxStoreData(results);
      state.searchedContents = searchMovies;
    });
    builder.addCase(
      searchActions.searchMovie.rejected,
      (state, { payload }) => {
        throw payload;
      }
    );
    builder.addCase(searchActions.searchTV.pending, (state, { meta }) => {
      state.searchMode = true;
      state.keyword = meta.arg;
    });
    builder.addCase(searchActions.searchTV.fulfilled, (state, { payload }) => {
      if (payload.results === undefined) return;
      state.searchedContents = reducerFormatUtil.tvListResultToReduxStoreData(
        payload.results
      );
    });
  },
});
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

export const searchActions = {
  ...asyncActions,
  ...slice.actions,
};

export const searchContentsReducer = slice.reducer;
