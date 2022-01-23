type useHandleFBErrorsRes = {
  handleErrorByCodes: (code: string) => string;
};

export const useHandleFBErrors = (): useHandleFBErrorsRes => {
  // const [message, setMessage] = useState<string>("");
  const handleErrorByCodes = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "入力されたEmailは、すでに使用されています";
      case "auth/wrong-password":
        return "パスワードが誤っています";
      default:
        return "不明なエラーです";
    }
  };

  return { handleErrorByCodes };
};
