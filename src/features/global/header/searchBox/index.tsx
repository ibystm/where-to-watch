import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
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
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => alert(values.searchName)}
    >
      {({ values, handleSubmit }) => {
        console.log("values", values);
        return (
          <Form>
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                children={<SearchIcon color="purple.500" as="button" />}
              />
              <Input
                type="search"
                placeholder="Movie Name"
                borderRadius="20px"
                name="searchBox"
                onKeyDown={onKeyDown}
                value={values.searchName}
              />
            </InputGroup>
          </Form>
        );
      }}
    </Formik>
  );
};
