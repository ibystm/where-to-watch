import { useDispatch } from "react-redux";
import { auth } from "../../app/firebase";
import { addFirestoreUser } from "../../db/firestore/users";
import { useActions } from "../../hooks/useActions";
import { AppDispatch } from "../../store";
import { actions } from "../../store/index";
import { storeUser } from "../../store/slices/usersSlice";

export const useSignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { startLoading, endLoading } = useActions(actions);
  const signUp = async (email: string, password: string) => {
    startLoading();
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user === null) {
      endLoading();
      throw new Error("No user found.");
    }

    await addFirestoreUser({
      userId: user.uid,
      name: user.displayName ?? "",
      email: user.email ?? "",
    });
    dispatch(
      storeUser({
        id: user.uid,
        email: user.email,
        userName: user.displayName,
      })
    );

    endLoading();
  };
  return { signUp };
};
