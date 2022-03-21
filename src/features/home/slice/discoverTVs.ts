import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { discoverMovieShowsAPI } from "../../../apis/discoverTVShows";
import { ActualContentData } from "../../../types/redux/discovers";
import { DiscoverTVShowsState } from "../../../types/redux/discoverTVShows";

const SLICE_NAME = "discoverTVShows";

const initialState: DiscoverTVShowsState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  data: [],
};

const asyncActions = {
  discoverTVShows: createAsyncThunk(
    `${SLICE_NAME}/discoverTVShows`,
    (_, { rejectWithValue }) => {
      try {
        return discoverMovieShowsAPI();
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
  extraReducers: (builders) => {
    builders.addCase(asyncActions.discoverTVShows.pending, (state) => {
      state.loading.isProcessing = true;
    });
    builders.addCase(
      asyncActions.discoverTVShows.fulfilled,
      (state, { payload }) => {
        if (payload.results) {
          const contents = payload.results.map(
            (item) =>
              ({
                id: item.id,
                genre_ids: item.genre_ids,
                title: item.name,
                poster_path: item.poster_path,
                releaseDate: item.first_air_date,
                overview: item.overview,
              } as ActualContentData)
          );
          state.data = contents;
        }
        state.loading.isProcessing = false;
      }
    );
    builders.addCase(
      asyncActions.discoverTVShows.rejected,
      (state, { payload }) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
  },
});

export const { reducer } = slice;
export const discoverTVShowsActions = {
  ...asyncActions,
};
