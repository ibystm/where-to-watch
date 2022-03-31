import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useSearchMoviesByKeyword } from "../useSearchContentsByKeyword";

jest.mock("react-redux");
let dummyDispatch: jest.Mock;
// なぜbeforeAll動かないのか謎・・・
beforeEach(() => {
  // useDispatchMock.mockClear();
  dummyDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dummyDispatch);
});

afterEach(() => dummyDispatch.mockClear());

describe("useSearchMoviesByKeyword", () => {
  it("handleSubmit関数が、引数が空でない文字列の時、dispatchが呼ばれること", () => {
    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "aiueo" });
    expect(dummyDispatch).toHaveBeenCalledTimes(1);
  });

  it("handleSubmit関数が、引数が空の文字列の時、returnされること", () => {
    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "" });
    expect(dummyDispatch).not.toHaveBeenCalled();
  });
});
