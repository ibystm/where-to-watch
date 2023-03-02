import { Action } from "@reduxjs/toolkit";
import { loadingActions, reducer } from "../index";

const LOADING_MESSAGE = "Loading......";

describe("loading reducer", () => {
  it("startLoading no strings", () => {
    const action = {
      type: loadingActions.startLoading.type,
    } as Action;
    const { isLoading, displayMessage } = reducer(undefined, action);
    expect(isLoading).toBe(true);
    expect(displayMessage).toBe(null);
  });

  it("startLoading with message", () => {
    const action = {
      type: loadingActions.startLoading.type,
      payload: LOADING_MESSAGE,
    } as Action;
    const { isLoading, displayMessage } = reducer(undefined, action);
    expect(isLoading).toBe(true);
    expect(displayMessage).toBe(LOADING_MESSAGE);
  });

  it("endLoading", () => {
    const action = {
      type: loadingActions.endLoading.type,
    } as Action;
    const { isLoading, displayMessage } = reducer(undefined, action);
    expect(isLoading).toBe(false);
    expect(displayMessage).toBe(null);
  });
});
