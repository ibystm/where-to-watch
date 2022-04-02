import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { initialState as searchMovieInitialState } from "../../../global/header/slice/searchMovie";
import { initialState as discoverMovieInitialS } from "../../slice/discoverMovies";
import { initialState as discoverTVShowsInitialState } from "../../slice/discoverTVs";
import { useDisplayContentsControl } from "../useDisplayContentsControl";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;

const dummyResponse = {
  discoverMovies: {
    loading: false,
    contents: [],
  },
  discoverTVShows: {
    loading: false,
    contents: [],
  },
  searchedContents: {
    loading: false,
    contents: [],
  },
};
const dummyStore = {
  searchMovies: searchMovieInitialState,
  discoverTVShows: discoverTVShowsInitialState,
  contents: discoverMovieInitialS,
};

beforeEach(() => {
  useSelectorMock.mockImplementation((selector) => selector(dummyStore));
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("useDisplayContentsControl", () => {
  it("contentsListを返すこと", () => {
    const { current } = renderHook(() => useDisplayContentsControl()).result;
    expect(current.contentsList).toEqual(dummyResponse);
  });
});
