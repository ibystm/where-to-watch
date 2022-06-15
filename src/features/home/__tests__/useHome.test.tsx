import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useHome } from "../useHome";

jest.mock("react-redux");

describe("useFetchConfig", () => {
  it("render時に1度dispatchが呼ばれること", () => {
    const dummyDispatchFn = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dummyDispatchFn);

    renderHook(() => useHome());
    expect(dummyDispatchFn).toHaveBeenCalledTimes(2);
  });
});
