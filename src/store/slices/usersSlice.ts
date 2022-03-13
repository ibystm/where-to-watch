import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string | null;
  userName: string | null;
  email: string | null;
};

const initialState: UserState = {
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
    signOutUser: (state) => {
      return initialState;
    },
  },
});

export const { reducer } = slice;

export const { storeUser, signOutUser } = slice.actions;
