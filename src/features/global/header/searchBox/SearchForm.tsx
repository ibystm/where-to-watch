import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchMoviesByKeyword } from "../hooks/useSearchContentsByKeyword";
import { searchMoviesActions } from "../slice/searchMovie";

export type SearchMovieFormValues = {
  searchName: string;
};

export const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useFormikContext<SearchMovieFormValues>();
  const { onEnterKeyDown } = useSearchMoviesByKeyword();

  useEffect(() => {
    if (values.searchName === "") {
      dispatch(searchMoviesActions.resetSearchMode());
    }
  }, [dispatch, values.searchName]);

  return (
    <Form>
      <Flex>
        <Input
          type="search"
          placeholder="Movie Name"
          name="searchName"
          onKeyDown={onEnterKeyDown}
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
};
