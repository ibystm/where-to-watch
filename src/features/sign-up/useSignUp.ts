import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormikErrors } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { addFirestoreUser } from "../../db/firestore/users";
import { useActions } from "../../hooks/useActions";
import { actions } from "../../store/index";
import { handleErrorByCodes } from "../../utils/firebase/handleError";

export type SignUpValue = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignUp = () => {
  const { startLoading, endLoading, storeUser } = useActions(actions);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const hasError = (errors: FormikErrors<SignUpValue>): boolean => {
    return (
      !!errors.confirmPassword ||
      !!errors.email ||
      !!errors.password ||
      !!errors.userName
    );
  };
  const onSubmit = async (values: SignUpValue) => {
    await signUp({
      email: values.email,
      password: values.password,
      userName: values.userName,
    }).catch((e) => {
      if (e.code && typeof e.code) {
        setSubmitError(handleErrorByCodes(e.code));
      }
      console.error(e);
    });
    navigate("/");
  };

  const signUp = async (params: {
    email: string;
    password: string;
    userName: string;
  }) => {
    const { email, password, userName } = params;
    startLoading();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user === null) {
      endLoading();
      throw new Error("No user found.");
    }

    await addFirestoreUser({
      userId: user.uid,
      name: userName,
      email: user.email ?? "",
    });

    storeUser({
      id: user.uid,
      email: user.email,
      userName: userName,
    });

    endLoading();
  };
  return {
    onSubmit,
    handleShowClick,
    hasError,
    submitError,
    navigate,
    showPassword,
  };
};
