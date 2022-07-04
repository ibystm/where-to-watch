import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { useActions } from "../../hooks/useActions";
import { actions } from "../../store/index";
import { storeUser } from "../../store/slices/usersSlice";
type UseSignInRes = {
  signIn: (email: string, password: string) => Promise<void>;
};

export const useSignIn = (): UseSignInRes => {
  const dispatch = useDispatch();
  const { startLoading, endLoading } = useActions(actions);
  const signIn = async (email: string, password: string) => {
    startLoading();
    const res = await auth.signInWithEmailAndPassword(email, password);
    if (res.user) {
      dispatch(
        storeUser({
          email: res.user.email,
          userName: "",
          id: res.user.uid,
        })
      );
    }
    endLoading();
  };

  return { signIn };
};
