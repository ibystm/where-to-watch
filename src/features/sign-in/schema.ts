import * as Yup from "yup";

export const schema = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8, "8文字以上にしてください"),
  }),
  onSubmit: () => {},
};
