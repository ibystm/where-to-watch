import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";

import { useActions } from "../../hooks/useActions";
import { actions } from "../../store/index";
import { handleErrorByCodes } from "../../utils/firebase/handleError";
import { schema } from "./schema";

export const useSignIn = (): typeof res => {
  const { startLoading, endLoading, storeUser } = useActions(actions);

  const { errors, isValid, touched, values, handleChange, handleBlur } =
    useFormik(schema);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (errors.email || errors.password) {
      return;
    }
    setErrorMessage("");
    startLoading();
    const res = await signIn(values.email, values.password).catch((e) => {
      if (e.code) {
        const msg = handleErrorByCodes(e.code);
        setErrorMessage(msg);
      }
    });
    endLoading();
    if (res) return navigate("/");
  };
  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    handleSubmit();
  };

  const signIn = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res.user) return;
    storeUser({
      email: res.user.email,
      userName: "",
      id: res.user.uid,
    });
    return res;
  };

  const res = {
    navigate,
    signIn,
    values,
    errors,
    isValid,
    touched,
    handleChange,
    handleBlur,
    onKeyDownEnter,
    errorMessage,
    handleShowClick,
    showPassword,
    handleSubmit,
  };
  return res;
};
