import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/slices/usersSlice";
import { getDocs } from "../../../utils/firebase/firestore/documentsHelper";
import { useBookmark } from "../useBookmarks";

jest.mock("../../../db/constants/collectionReferences.ts", () => ({
  collectionReferences: {
    bookmarks: jest.fn().mockImplementation((id) => {}),
  },
}));
jest.mock("react-redux");
jest.mock("../../../utils/firebase/firestore/documentsHelper.ts");

const useSelectorMock = useSelector as jest.Mock;
const getDocsMock = getDocs as jest.Mock;

const dummyStore = (user?: Partial<UserState>) => ({
  user: {
    id: null,
    userName: null,
    email: null,
    ...user,
  } as UserState,
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("useBookmarks", () => {
  it("userIdがnullの場合、返却される変数が初期値の状態であること", () => {
    useSelectorMock.mockImplementation((selector) => selector(dummyStore()));
    const {
      current: { loading, bookmarkList, hasBookMarkList },
    } = renderHook(() => useBookmark()).result;
    expect(loading).toBe(false);
    expect(bookmarkList).toHaveLength(0);
    expect(hasBookMarkList).toBe(false);
  });

  it("userIdが存在する場合、stateが変更されること", async () => {
    useSelectorMock.mockImplementation((selector) =>
      selector(
        dummyStore({
          id: "111",
          userName: "test",
          email: "example@exemple.com",
        })
      )
    );
    getDocsMock.mockImplementation(async () => []);

    const {
      current: { loading, bookmarkList, hasBookMarkList },
    } = renderHook(() => useBookmark()).result;
    await waitFor(() => expect(loading).toBe(true));
    expect(bookmarkList).toHaveLength(0);
    expect(hasBookMarkList).toBe(false);
  });
});
