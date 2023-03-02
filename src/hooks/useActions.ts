import {
  ActionCreator,
  ActionCreatorsMapObject,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export type BindedActionCreators<AC extends ActionCreatorsMapObject> = {
  [K in keyof AC]: {
    (...arg: Parameters<AC[K]>): AC[K] extends ActionCreator<Function>
      ? ReturnType<ReturnType<AC[K]>>
      : ReturnType<AC[K]>;
  };
};

export const useActions = <ActionCreators extends ActionCreatorsMapObject>(
  actions: ActionCreators,
  deps: ActionCreators[] = []
): BindedActionCreators<ActionCreators> => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deps.length > 0 ? [dispatch, ...deps] : dispatch]
  );
};
