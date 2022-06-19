import { renderHook } from "@testing-library/react-hooks";
import { RootState, useSelector } from "../../../../../store/index";
import { useChoiceTabs } from "../useChoiceTabs";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const dummyStore: Partial<RootState> = {
  contentsMode: {
    modeIndex: 0,
    selectedGenreId: 0,
  },
};

beforeEach(() => {
  useSelectorMock.mockImplementation((selector) => selector(dummyStore));
});

describe("useChoicetabs", () => {
  it("test", () => {
    const { result } = renderHook(() => useChoiceTabs());
    expect(result.current.modeIndex).toBe(0);
  });
});
