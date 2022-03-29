import { renderHook } from "@testing-library/react-hooks";
import * as reactRedux from "react-redux";
import { useSearchMoviesByKeyword } from "../useSearchContentsByKeyword";

const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

beforeEach(() => {
  useDispatchMock.mockClear();
});

describe("useSearchMoviesByKeyword", () => {
  it("handleSubmit関数が、引数が空の文字列の時、returnされること", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "" });
    expect(dummyDispatch).not.toHaveBeenCalled();
  });

  it("handleSubmit関数が、引数が空でない文字列の時、dispatchが呼ばれること", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "aiueo" });
    expect(dummyDispatch).toHaveBeenCalledTimes(1);
  });
});
