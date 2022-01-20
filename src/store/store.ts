import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { usersSlice } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    user: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// typed useSelector
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
