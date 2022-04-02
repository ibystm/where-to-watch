import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMoviesAPI } from "../../../../apis/searchMovies";
import { ActualContentData } from "../../../../types/redux/discovers";
import { SearchMovieState } from "../../../../types/redux/searchMovies";

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
  searchMovies: createAsyncThunk(
    `${SLICE_NAME}/searchMovies`,
    async (keyword: string, { rejectWithValue }) => {
      try {
        const res = searchMoviesAPI(keyword);
        return res;
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
    builder.addCase(
      searchMoviesActions.searchMovies.pending,
      (state, { meta }) => {
        state.loading.isProcessing = true;
        state.searchMode = true;
        state.keyword = meta.arg;
      }
    );
    builder.addCase(
      searchMoviesActions.searchMovies.fulfilled,
      (state, { payload, meta }) => {
        const { results } = payload;

        if (results) {
          const searchMovies = results.map(
            (item) =>
              ({
                id: item.id,
                adult: item.adult,
                overview: item.overview,
                original_title: item.original_title,
                original_language: item.original_language,
                title: item.title,
                poster_path: item.poster_path ?? null,
                backdrop_path: item.backdrop_path ?? null,
                video: item.video,
                releaseDate: item.release_date,
              } as ActualContentData)
          );
          state.searchMovies = searchMovies;
        }
        state.loading.isProcessing = false;
      }
    );
    builder.addCase(
      searchMoviesActions.searchMovies.rejected,
      (state, { payload }) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
  },
});

export const searchMoviesActions = {
  ...asyncActions,
  ...slice.actions,
};

export const { reducer } = slice;
