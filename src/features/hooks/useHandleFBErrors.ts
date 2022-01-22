type useHandleFBErrorsRes = {
  handleErrorByCodes: (code: string) => string;
};

export const useHandleFBErrors = (): useHandleFBErrorsRes => {
  const handleErrorByCodes = (code: string) => {
    if (code === "auth/email-already-in-use") {
      return "入力されたEmailは、すでに使用されています";
    }
    return "不明なエラーです";
  };
  return { handleErrorByCodes };
};
