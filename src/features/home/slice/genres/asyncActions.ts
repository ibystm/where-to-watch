import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieGenres, getTVGenres } from "../../../../apis/genres";

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
