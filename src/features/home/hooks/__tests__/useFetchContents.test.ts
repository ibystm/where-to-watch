import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useFetchContents } from "../useFetchContents";

jest.mock("react-redux");

describe("useFetchContents", () => {
  it("render時にdispatchが2回走ること", () => {
    const dummyDispatchFn = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dummyDispatchFn);

    renderHook(() => useFetchContents());
    expect(dummyDispatchFn).toHaveBeenCalledTimes(2);
  });
});
