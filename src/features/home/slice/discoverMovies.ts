import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDiscoverMoviesAPI } from "../../../apis/fetchContents";
import { ContentsState } from "../../../types/redux/discovers";

const SLICE_NAME = "contents";
export const initialState: ContentsState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  data: [],
};

const asyncActions = {
  fetchDiscoverMovies: createAsyncThunk(
    `${SLICE_NAME}/fetchDiscoverMovies`,
    async (genreId: number, { rejectWithValue }) => {
      try {
        const res = await fetchDiscoverMoviesAPI(genreId);
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
          if (results) {
            const contents = results.map((item) => ({
              id: item.id,
              adult: item.adult,
              overview: item.overview,
              original_title: item.original_title,
              original_language: item.original_language,
              title: item.title,
              poster_path: item.poster_path ?? null,
              backdrop_path: item.backdrop_path ?? null,
              video: item.video,
              voteAverage: item.vote_average,
              voteCount: item.vote_count,
              genreIds: item.genre_ids,
              releaseDate: item.release_date,
            }));
            state.data = contents;
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
  },
});

export const contentsActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;
