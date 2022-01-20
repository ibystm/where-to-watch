import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { storeUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.user;
