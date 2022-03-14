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
    <Box width="100%">
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