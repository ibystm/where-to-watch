import { Box } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import { useSearchMoviesByKeyword } from "../hooks/useSearchContentsByKeyword";
import { SearchForm, SearchMovieFormValues } from "./SearchForm";

const initialValues = {
  searchName: "",
};

export const GlobalSearchBox = () => {
  const { handleSubmit } = useSearchMoviesByKeyword();
  const formikRef = useRef<FormikProps<SearchMovieFormValues>>(null);

  return (
    <Box
      width="100%"
      boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <SearchForm />
      </Formik>
    </Box>
  );
};
