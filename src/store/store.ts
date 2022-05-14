import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { reducer as configurationsReducer } from "../features/configurations/slice/configurations";
import { contentsModeReducer } from "../features/global/header/slice/contentsMode";
import { searchContentsReducer } from "../features/global/header/slice/searchContents";
import { reducer as discoverContentsReducer } from "../features/home/slice/discoverMovies";
import { genresReducer } from "../features/home/slice/genres/index";
import { reducer as loadingReducer } from "../features/loading/slice/loading";
import { popularitiesReducer } from "../features/loading/slice/popularities/index";
import { reducer as userReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    contentsMode: contentsModeReducer,
    loading: loadingReducer,
    configurations: configurationsReducer,
    user: userReducer,
    discovers: discoverContentsReducer, // 命名をcontentsに変更する
    searchContents: searchContentsReducer,
    popularities: popularitiesReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
