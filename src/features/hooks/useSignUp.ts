import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import { storeUser } from "../../store/slices/usersSlice";
import { AppDispatch } from "../../store/store";

export const useSignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const signUp = async (email: string, password: string) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const fbUser = res.user;
        if (fbUser === null) {
          throw new Error("No user found.");
        }
        console.log("fbUser", fbUser.email);
        dispatch(
          storeUser({
            id: fbUser.uid,
            email: fbUser.email,
            userName: fbUser.displayName,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return { signUp };
};
