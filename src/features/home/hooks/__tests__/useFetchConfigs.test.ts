import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useFetchConfigs } from "../useFetchConfigs";

jest.mock("react-redux");
let dummyDispatch: jest.Mock;

beforeEach(() => {
  dummyDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dummyDispatch);
});

describe("useFetchConfig", () => {
  it("render時に1度dispatchが呼ばれること", () => {
    renderHook(() => useFetchConfigs());
    expect(dummyDispatch.call.length).toBe(1);
  });

  it("render時にdispatchが複数呼ばれないこと", () => {
    renderHook(() => useFetchConfigs());
    expect(dummyDispatch.call.length).not.toBe(2);
  });
});
