import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import {
  configurationActions,
  reducer as configurationsReducer,
} from "../features/configurations/slice";
import {
  contentModeActions,
  contentsModeReducer,
} from "../features/global/header/slice/contentsMode";
import { searchContentsReducer } from "../features/global/header/slice/searchContents";
import {
  contentsActions,
  reducer as discoverContentsReducer,
} from "../features/home/slice/discovers";
import {
  genresActions,
  genresReducer,
} from "../features/home/slice/genres/index";
import {
  popularitiesActions,
  popularitiesReducer,
} from "../features/home/slice/popularities/index";
import { reducer as loadingReducer } from "../features/loading/slice";
import { loadingActions } from "../features/loading/slice/index";
import { reducer as userReducer } from "./slices/usersSlice";

export const actions = {
  ...contentModeActions,
  ...genresActions,
  ...loadingActions,
  ...configurationActions,
  ...contentsActions,
  ...popularitiesActions,
  // ...searchContentsActions
};

export const store = configureStore({
  reducer: {
    contentsMode: contentsModeReducer,
    genres: genresReducer,
    loading: loadingReducer,
    configurations: configurationsReducer,
    user: userReducer,
    discovers: discoverContentsReducer, // 命名をcontentsに変更する
    popularities: popularitiesReducer,
    searchContents: searchContentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
