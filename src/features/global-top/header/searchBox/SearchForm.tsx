import { Input } from "@chakra-ui/react";
import React from "react";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { useSearchBox } from "./useSearchForm";

export type SearchMovieFormValues = {
  searchName: string;
};

type P = {
  onCloseModal: () => void;
};

export const SearchForm: React.FC<P> = ({ onCloseModal }) => {
  const { handleChange, searchKeyword, handleSubmit } = useSearchBox();

  return (
    <Input
      placeholder={commonDictionaries.titleName}
      name="searchName"
      value={searchKeyword}
      onChange={handleChange}
      _focus={{
        border: "none",
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onCloseModal();
          handleSubmit();
        }
      }}
      border="none"
      type="search"
    />
  );
};
