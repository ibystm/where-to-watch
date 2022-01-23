import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { storeUser } from "../../store/slices/usersSlice";
type UseSignInRes = {
  signIn: (email: string, password: string) => Promise<void>;
};

export const useSignIn = (): UseSignInRes => {
  const dispatch = useDispatch();
  const signIn = async (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password).then((res) => {
      if (!res.user) {
        throw new Error("Not found user!");
      }
      dispatch(
        storeUser({
          email: res.user.email,
          userName: "",
          id: res.user.uid,
        })
      );
    });
  };

  return { signIn };
};
