import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getMovieGenres, getTVGenres } from "../../../../apis/genres";
import { Genres } from "../../../../types/redux/genres";

const GENRE_SLICE_NAME = "genres";

export const genreAdopter = createEntityAdapter<Genres>({
  sortComparer: (a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    return -1;
  },
});
const initialEntityState = genreAdopter.getInitialState();

const slice = createSlice({
  name: GENRE_SLICE_NAME,
  initialState: {
    movie: initialEntityState,
    tv: initialEntityState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.getMovieGenres.fulfilled,
      (state, { payload }) => {
        genreAdopter.setAll(state.movie, payload.genres);
      }
    );
    builder.addCase(
      asyncActions.getMovieGenres.rejected,
      (state, { payload }) => {
        throw payload;
      }
    );
    builder.addCase(
      asyncActions.getTVGenres.fulfilled,
      (state, { payload }) => {
        genreAdopter.setAll(state.tv, payload.genres);
      }
    );
    builder.addCase(asyncActions.getTVGenres.rejected, (state, { payload }) => {
      throw payload;
    });
  },
});

export const asyncActions = {
  getMovieGenres: createAsyncThunk(
    `genres/getMovieGenres`,
    async (_, { rejectWithValue }) => {
      try {
        return getMovieGenres();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  getTVGenres: createAsyncThunk(
    `genres/getTVGenres`,
    async (_, { rejectWithValue }) => {
      try {
        return getTVGenres();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

export const genresReducer = slice.reducer;
export const genresActions = {
  ...slice.actions,
  ...asyncActions,
};
