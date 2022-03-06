import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDiscoverMoviesAPI } from "../../../apis/fetchContents";
import { RootState } from "../../../store/store";
import {
  ActualContentData,
  ContentsState,
} from "../../../types/redux/discovers";

const SLICE_NAME = "contents";
const initialState: ContentsState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  data: [],
};

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
            results.forEach((item) => {
              const content: ActualContentData = {
                id: item.id,
                adult: item.adult,
                overview: item.overview,
                original_title: item.original_title,
                original_language: item.original_language,
                title: item.title,
                poster_path: item.poster_path ?? null,
                backdrop_path: item.backdrop_path ?? null,
                video: item.video,
              };
              state.data.push(content);
            });
          }
          state.loading.isProcessing = false;
        }
      }
    );
    builder.addCase(asyncActions.fetchDiscoverMovies.rejected, (_, payload) => {
      throw payload;
    });
  },
});

export const contentsActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;

// ======== selectors ========
export const selectContents = (state: RootState) => state.contents.data;
export const selectLoadingState = (state: RootState) =>
  state.contents.loading.isProcessing;
