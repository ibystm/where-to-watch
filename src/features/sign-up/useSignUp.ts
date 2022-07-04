import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { useActions } from "../../hooks/useActions";
import { AppDispatch } from "../../store";
import { actions } from "../../store/index";
import { storeUser } from "../../store/slices/usersSlice";

export const useSignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { startLoading, endLoading } = useActions(actions);
  const signUp = async (email: string, password: string) => {
    startLoading();
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (res) {
      const fbUser = res.user;
      if (fbUser === null) {
        throw new Error("No user found.");
      }
      dispatch(
        storeUser({
          id: fbUser.uid,
          email: fbUser.email,
          userName: fbUser.displayName,
        })
      );
    }
    endLoading();
  };
  return { signUp };
};
