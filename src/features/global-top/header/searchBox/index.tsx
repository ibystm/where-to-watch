import { Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import { SearchForm, SearchMovieFormValues } from "./SearchForm";

const initialValues = {
  searchName: "",
};

export const GlobalSearchBox = () => {
  // const { handleSubmit } = useSearchMoviesByKeyword();
  const formikRef = useRef<FormikProps<SearchMovieFormValues>>(null);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <SearchForm />
    </Formik>
  );
};
