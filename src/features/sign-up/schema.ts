import * as Yup from "yup";

const passwordRegex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/;
export const validationScheme = Yup.object().shape({
  userName: Yup.string()
    .required("必須です")
    .min(5, "5文字以上にしてください")
    .max(8, "12文字以下にしてください"),
  email: Yup.string()
    .email("正しい形式のemailを設定してください")
    .required("必須です"),
  password: Yup.string()
    .required("必須です")
    .min(8, "8文字以上にしてください")
    .max(24, "24文字以下にしてください")
    .matches(passwordRegex, {
      message: "大文字・小文字・数字を含むパスワードを指定してください",
    }),
  confirmPassword: Yup.string()
    .required("必須です")
    .min(8, "8文字以上にしてください")
    .max(24, "24文字以下にしてください")
    .matches(
      passwordRegex,
      "大文字・小文字・数字を含むパスワードを指定してください"
    )
    .oneOf([Yup.ref("password")], "パスワードが一致しません"),
});
