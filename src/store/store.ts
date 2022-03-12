import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { reducer as configurationsReducer } from "../features/configurations/slice/configurations";
import { reducer as searchMovieReducer } from "../features/global/header/slice/searchMovie";
import { reducer as contentsReducer } from "../features/home/slice/contents";
import { reducer as loadingReducer } from "../features/loading/slice/loading";
import { reducer as userReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    contents: contentsReducer,
    searchMovies: searchMovieReducer,
    configurations: configurationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// typed useSelector
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
