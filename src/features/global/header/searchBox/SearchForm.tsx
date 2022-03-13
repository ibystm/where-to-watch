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
    // 0.5秒以上入力がない場合に、search requestをする
    const timerId = setTimeout(() => {
      if (values.searchName === "") {
        dispatch(searchMoviesActions.resetSearchMode());
        return;
      }
      dispatch(searchMoviesActions.searchMovies(values.searchName));
    }, 500);

    return () => {
      console.log(`timerid ${timerId} is cleared!`);
      clearTimeout(timerId);
    };
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
          focusBorderColor="purple.400"
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
