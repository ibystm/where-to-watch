import { useDispatch } from "react-redux";
import { auth } from "../../app/firebase";
import { addFirestoreUser } from "../../db/users";
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
      if (res.user === null) {
        throw new Error("No user found.");
      }
      await addFirestoreUser({
        userId: res.user.uid,
        name: res.user.displayName ?? "",
        email: res.user.email ?? "",
      });
      dispatch(
        storeUser({
          id: res.user.uid,
          email: res.user.email,
          userName: res.user.displayName,
        })
      );
    }
    endLoading();
  };
  return { signUp };
};
