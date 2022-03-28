import { renderHook } from "@testing-library/react-hooks";
import { useSearchMoviesByKeyword } from "../useSearchContentsByKeyword";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("useSearchMoviesByKeyword", () => {
  it("handleSubmit関数が、引数が空の文字列の時、returnされること", () => {
    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "" });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("handleSubmit関数が、引数が空でない文字列の時、dispatchが呼ばれること", () => {
    const { result } = renderHook(() => useSearchMoviesByKeyword());
    result.current.handleSubmit({ searchName: "aiueo" });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
