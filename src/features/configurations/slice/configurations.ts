import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConfigurations } from "../../../apis/fetchConfigurations";
import { FetchConfigurationResponse } from "../../../apis/types/configurations";
const SLICE_NAME = "configuration";

type ConfigurationState = FetchConfigurationResponse;

export const initialState: ConfigurationState = {
  images: [],
  change_keys: [],
};

const asyncActions = {
  fetchConfigurations: createAsyncThunk(
    `${SLICE_NAME}/fetchConfiguration`,
    (_, { rejectWithValue }) => {
      try {
        return fetchConfigurations;
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
  extraReducers: {},
});

export const actions = {
  ...asyncActions,
};

export const { reducer } = slice;
