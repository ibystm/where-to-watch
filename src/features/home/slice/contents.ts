import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDiscoverMoviesAPI } from "../../../apis/fetchContents";
import { ContentsState } from "../../../apis/types/discovers";

const SLICE_NAME = "contents";

const asyncActions = {
  fetchDiscoverMovies: createAsyncThunk(
    `${SLICE_NAME}/fetchDiscoverMovies`,
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetchDiscoverMoviesAPI();
        return res;
      } catch (e) {
        rejectWithValue(e);
      }
    }
  ),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState: [] as ContentsState[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.fetchDiscoverMovies.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (results) {
            const mappedRes = results.map(
              (item) =>
                ({
                  id: item.id,
                  adult: item.adult,
                  overview: item.overview,
                  original_title: item.original_title,
                  original_language: item.original_language,
                  title: item.title,
                  poster_path: item.poster_path,
                  backdrop_path: item.backdrop_path,
                  video: item.video,
                } as ContentsState)
            );
            return mappedRes;
          }
        }
      }
    );
    builder.addCase(
      asyncActions.fetchDiscoverMovies.rejected,
      (_state, payload) => {
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
