import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useSearchMoviesByKeyword } from "../hooks/useSearchContentsByKeyword";

type FormValues = {
  searchName: string;
};

const initialValues = {
  searchName: "",
};

export const GlobalSearchBox = () => {
  const { serchByKeyword } = useSearchMoviesByKeyword();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      alert(e.currentTarget.value);
    }
  };
  const onSubmit = async (values: FormValues) => {
    if (values.searchName) {
      await serchByKeyword(values.searchName);
    }
  };

  return (
    <Box width="100%">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form>
              <Flex>
                <Input
                  type="search"
                  placeholder="Movie Name"
                  name="searchName"
                  onKeyDown={onKeyDown}
                  value={values.searchName}
                  onChange={handleChange}
                />
                <IconButton
                  type="submit"
                  ml="2px"
                  width="24px"
                  colorScheme="purple"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
