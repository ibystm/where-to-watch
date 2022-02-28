import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConfigurations } from "../../../apis/fetchConfigurations";
import { FetchConfigurationResponse } from "../../../apis/types/configurations";
import { RootState } from "../../../store/store";
const SLICE_NAME = "configuration";

type ConfigurationState = FetchConfigurationResponse & {
  loading: boolean;
};

export const initialState: ConfigurationState = {
  images: [],
  change_keys: [],
  loading: false,
};

const asyncActions = {
  fetchConfigurations: createAsyncThunk(
    `${SLICE_NAME}/fetchConfiguration`,
    (_, { rejectWithValue }) => {
      try {
        return fetchConfigurations();
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
    builder.addCase(asyncActions.fetchConfigurations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      asyncActions.fetchConfigurations.fulfilled,
      (state, { payload }) => {
        const { images, change_keys } = payload;
        if (images) {
          state.images = images;
        }
        if (change_keys) {
          state.change_keys = change_keys;
        }
        state.loading = false;
      }
    );
    builder.addCase(
      asyncActions.fetchConfigurations.rejected,
      (state, { payload }) => {
        throw payload;
      }
    );
  },
});

export const actions = {
  ...asyncActions,
};

export const { reducer } = slice;

export const selectConfigurations = (state: RootState) => state.configurations;
