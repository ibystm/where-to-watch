import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../store";
import { UserState } from "../../../store/slices/usersSlice";
import { getDocs } from "../../../utils/firebase/firestore/documentsHelper";
import { useMyProfile } from "../useMyProfile";

const dummyStore = (user?: Partial<UserState>) => ({
  user: {
    id: null,
    userName: null,
    email: null,
    ...user,
  } as UserState,
});

jest.mock("react-redux");
jest.mock("../../../utils/firebase/firestore/documentsHelper.ts");
jest.mock("firebase/auth");
jest.mock("react-router-dom");

const useSelectorMock = useSelector as jest.Mock;
const getDocsMock = getDocs as jest.Mock;
const getAuthMock = getAuth as jest.Mock;
const useNavigationmock = useNavigate as jest.Mock;

beforeEach(() => {
  getDocsMock.mockResolvedValue([]);
  useNavigationmock.mockImplementation(() => {});
});

afterEach(() => {
  useSelectorMock.mockClear();
  getDocsMock.mockClear();
  getAuthMock.mockClear();
});

describe("useMyProfile", () => {
  it("userIdがnullの時", () => {
    useSelectorMock.mockImplementation((selector) => selector(dummyStore()));
    getAuthMock.mockReturnValue({});
    const {
      current: { isFetching },
    } = renderHook(() => useMyProfile()).result;
    expect(isFetching).toBe(false);
  });

  it("userIdがstringの時", async () => {
    getAuthMock.mockReturnValue({});
    useSelectorMock.mockImplementation((selector) =>
      selector(dummyStore({ id: "0000" }))
    );

    const { current } = renderHook(() => useMyProfile()).result;
    // NOTE: waitForの挙動
    // タイムアウトになるまでコールバックを実行し続ける
    await waitFor(() => {
      expect(current.isFetching).toBe(true);
    });
  });
});
