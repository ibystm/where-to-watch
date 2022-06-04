import { Input } from "@chakra-ui/react";
import React from "react";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { useSearchBox } from "./useSearchForm";

export type SearchMovieFormValues = {
  searchName: string;
};

export const SearchForm: React.FC = () => {
  const { handleChange, searchKeyword } = useSearchBox();

  return (
    <Input
      placeholder={commonDictionaries.titleName}
      name="searchName"
      value={searchKeyword}
      onChange={handleChange}
      focusBorderColor="purple.300"
      boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
      borderRadius="inherit"
      type="search"
    />
  );
};
