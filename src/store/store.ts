import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { reducer as contentsReducer } from "../features/home/slice/contents";
import { reducer as userReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contents: contentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// typed useSelector
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
