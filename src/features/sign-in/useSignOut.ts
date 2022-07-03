import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { actions } from "../../store";
import { signOutUser } from "../../store/slices/usersSlice";
type useSignOutRes = {
  signOut: () => Promise<void>;
};

export const useSignOut = (): useSignOutRes => {
  const dispatch = useDispatch();
  const { startLoading, endLoading } = actions;
  const signOut = async () => {
    startLoading();
    await auth.signOut();
    dispatch(signOutUser());
    endLoading();
  };

  return {
    signOut,
  };
};
