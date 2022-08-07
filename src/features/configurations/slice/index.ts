import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConfigurations as fetchConfigurationsAPI } from "../../../apis/configurations";
import { ImageConfigurations } from "../../../apis/types/configurations";
import { RootState } from "../../../store";
const SLICE_NAME = "configuration";

type ConfigurationState = {
  images: ImageConfigurations | null;
  changeKeys: string[];
  hideHeaderPaths: string[];
};

export const initialState: ConfigurationState = {
  images: null,
  changeKeys: [],
  hideHeaderPaths: [],
};

const asyncActions = {
  fetchConfigurations: createAsyncThunk(
    `${SLICE_NAME}/fetchConfiguration`,
    (_, { rejectWithValue }) => {
      try {
        return fetchConfigurationsAPI();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addHeaderHidePaths: (state, { payload }) => {
      state.hideHeaderPaths = [state, ...payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncActions.fetchConfigurations.fulfilled,
      (state, { payload }) => {
        const { images, change_keys } = payload;
        if (images) {
          state.images = images;
        }
        if (change_keys) {
          state.changeKeys = change_keys;
        }
      }
    );
    builder.addCase(
      asyncActions.fetchConfigurations.rejected,
      (_, { payload }) => {
        throw payload;
      }
    );
  },
});

export const configurationActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;

export const selectConfigurations = (state: RootState) => state.configurations;
export const selectSecureBaseUrl = (state: RootState) =>
  state.configurations.images?.secure_base_url;
export const selectPosterSizes = (state: RootState) =>
  state.configurations.images?.poster_sizes;
