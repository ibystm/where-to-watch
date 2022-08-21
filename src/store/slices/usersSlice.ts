import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO 後でファイルごとdirectory移動

type UserState = {
  id: string | null;
  userName: string | null;
  email: string | null;
};

export const initialState: UserState = {
  id: null,
  userName: null,
  email: null,
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    signOutUser: () => {
      return initialState;
    },
  },
});

export const { reducer } = slice;

export const userActions = slice.actions;
