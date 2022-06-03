import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  searchMoviesAPI,
  searchTVAPI,
} from "../../../../../apis/search-contents";
import { DiscoverMovieResponse } from "../../../../../apis/types/discovers";
import { DiscoverTVShowsResponse } from "../../../../../apis/types/discoverTVShows";
import { ActualContentData } from "../../../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../../../utils/redux/reducerUtil";

const SLICE_NAME = "searcContents";

export const searchContentsAdoptor = createEntityAdapter<ActualContentData>();
const initialSearchedContentsState = searchContentsAdoptor.getInitialState();

export const initialState = {
  searchMode: false,
  keyword: "",
  searchedContents: initialSearchedContentsState,
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
      searchContentsActions.searchMovie.pending,
      (state, { meta }) => {
        state.searchMode = true;
        state.keyword = meta.arg.keyword;
      }
    );
    builder.addCase(
      searchContentsActions.searchMovie.fulfilled,
      (state, action) => {
        const { results } = action.payload;
        if (results === undefined) return;
        const searchMovies =
          reducerFormatUtil.movieListResultToReduxStoreData(results);
        searchContentsAdoptor.setAll(state.searchedContents, searchMovies);
      }
    );
    builder.addCase(
      searchContentsActions.searchMovie.rejected,
      (state, { payload }) => {
        throw payload;
      }
    );
    builder.addCase(
      searchContentsActions.searchTV.pending,
      (state, { meta }) => {
        state.searchMode = true;
        state.keyword = meta.arg.keyword;
      }
    );
    builder.addCase(
      searchContentsActions.searchTV.fulfilled,
      (state, { payload }) => {
        if (payload.results === undefined) return;

        searchContentsAdoptor.setAll(
          state.searchedContents,
          reducerFormatUtil.tvListResultToReduxStoreData(payload.results)
        );
      }
    );
  },
});
const asyncActions = {
  searchMovie: createAsyncThunk<
    DiscoverMovieResponse,
    { keyword: string; page?: number }
  >(`${SLICE_NAME}/searchMovies`, async (params, { rejectWithValue }) => {
    const { keyword, page } = params;
    try {
      return searchMoviesAPI(keyword, page);
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
  searchTV: createAsyncThunk<
    DiscoverTVShowsResponse,
    { keyword: string; page?: number }
  >(`${SLICE_NAME}/searchTVs`, async (params, { rejectWithValue }) => {
    const { keyword, page } = params;
    try {
      return searchTVAPI(keyword, page);
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
};

export const searchContentsActions = {
  ...asyncActions,
  ...slice.actions,
};

export const searchContentsReducer = slice.reducer;
