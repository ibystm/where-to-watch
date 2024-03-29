export const handleErrorByCodes = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "入力されたEmailは、すでに使用されています";
    case "auth/user-not-found":
      return "メールアドレスが誤っています";
    case "auth/wrong-password":
      return "パスワードが誤っています";
    default:
      return "不明なエラーです";
  }
};
