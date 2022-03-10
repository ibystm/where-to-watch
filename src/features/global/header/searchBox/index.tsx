import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

export const GlobalSearchBox = () => {
  const initialValues = {
    searchName: "",
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.keyCode === 13) {
      alert(e.currentTarget.value);
    }
  };
  return (
    <Box width="100%">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => alert(values.searchName)}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Form>
              <Flex>
                <Input
                  type="search"
                  placeholder="Movie Name"
                  // borderRadius="20px"
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
