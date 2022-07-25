import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";

import { useActions } from "../../hooks/useActions";
import { actions } from "../../store/index";
import { storeUser } from "../../store/slices/usersSlice";
import { handleErrorByCodes } from "../../utils/firebase/handleError";
import { schema } from "./schema";

export const useSignIn = (): typeof res => {
  const dispatch = useDispatch();
  const { startLoading, endLoading } = useActions(actions);

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
    await signIn(values.email, values.password).catch((e) => {
      if (e.code && e.code === 400) {
        const msg = handleErrorByCodes(e.code);
        setErrorMessage(msg);
      }
    });
    navigate("/");
  };
  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    handleSubmit();
  };

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
