import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { upcomingsAPI } from "../../../../apis/upcomings";
import { UpComingState } from "../../../../types/redux/upcomings";
import { reducerFormatUtil } from "../../../../utils/redux/reducerUtil";

const SLICE_NAME = "upcoming";
const asyncActions = {
  fetchUpcomingMovies: createAsyncThunk(
    `${SLICE_NAME}/fetchUpComingMovies`,
    async (_, { rejectWithValue }) => {
      try {
        const res = await upcomingsAPI.fetchUpcomingMovies();
        return res;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  // TVの方はまだ用意されていない
  // fetchUpcomingTVs: createAsyncThunk(
  //   `${SLICE_NAME}/fetchUpComingTVs`,
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       return await upcomingsAPI.fetchUpcomingTVs();
  //     } catch (e) {
  //       return rejectWithValue(e);
  //     }
  //   }
  // ),
};

const upcomingInitialState: UpComingState = {
  movie: {
    loading: false,
    data: [],
  },
  tv: {
    loading: false,
    data: [],
  },
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState: upcomingInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.fetchUpcomingMovies.fulfilled,
      (state, { payload }) => {
        const formatedMovie = reducerFormatUtil.movieListResultToReduxStoreData(
          payload.results
        );
        state.movie.data = formatedMovie;
      }
    );
  },
});

export const upcomingReducer = slice.reducer;
export const upcomingActions = {
  ...slice.actions,
  ...asyncActions,
};
