import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { signOutUser } from "../../store/slices/usersSlice";
type useSignOutRes = {
  signOut: () => Promise<void>;
};

export const useSignOut = (): useSignOutRes => {
  const dispatch = useDispatch();
  const signOut = async () => {
    await auth.signOut().then(() => {
      dispatch(signOutUser());
    });
  };

  return {
    signOut,
  };
};
