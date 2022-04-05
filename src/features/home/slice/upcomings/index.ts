import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { upcomingsAPI } from "../../../../apis/upcomings";
import { ActualContentData } from "../../../../types/redux/discovers";
import { UpComingState } from "../../../../types/redux/upcomings";

const SLICE_NAME = "upcoming";
const asyncActions = {
  fetchUpcomingMovies: createAsyncThunk(
    `${SLICE_NAME}/fetchUpComingMovies`,
    async (_, { rejectWithValue }) => {
      try {
        const [movie, tv] = await Promise.all([
          upcomingsAPI.fetchUpcomingMovies(),
          upcomingsAPI.fetchUpcomingTVs(),
        ]);
        console.log({ movie });
        console.log({ tv });
        return {
          movie,
          tv,
        };
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
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
        const formatedMovie: ActualContentData[] = payload.movie.results.map(
          (item) => ({
            id: item.id,
            title: item.title,
            adult: item.adult,
            overview: item.overview,
            original_title: item.original_title,
            poster_path: item.poster_path ?? null,
            backdrop_path: item.backdrop_path ?? null,
            video: item.video,
            releaseDate: item.release_date,
            voteCoun: item.vote_count,
            voteAverage: item.vote_average,
            genre_ids: item.genre_ids,
          })
        );
        state.movie.data = formatedMovie;

        const formatedTV: ActualContentData[] = payload.tv.results.map(
          (item) => ({
            id: item.id,
            title: item.title,
            adult: item.adult,
            overview: item.overview,
            original_title: item.original_title,
            poster_path: item.poster_path ?? null,
            backdrop_path: item.backdrop_path ?? null,
            video: item.video,
            releaseDate: item.release_date,
            voteCoun: item.vote_count,
            voteAverage: item.vote_average,
            genre_ids: item.genre_ids,
          })
        );
        state.tv.data = formatedTV;
      }
    );
  },
});

export const upcomingReducer = slice.reducer;
export const upcomingActions = {
  ...slice.actions,
  ...asyncActions,
};
