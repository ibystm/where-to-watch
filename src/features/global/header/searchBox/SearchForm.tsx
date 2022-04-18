import { Input } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { useSelector } from "../../../../store/store";
import { ModeType } from "../../../../types/redux/contentsMode";
import { searchActions } from "../slice/searchMovie";

export type SearchMovieFormValues = {
  searchName: string;
};

export const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useFormikContext<SearchMovieFormValues>();
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);

  useEffect(() => {
    // 0.5秒以上入力がない場合に、search requestをする
    const timerId = setTimeout(() => {
      if (values.searchName === "") {
        dispatch(searchActions.resetSearchMode());
        return;
      }

      if (modeIndex === ModeType.Movie) {
        dispatch(searchActions.searchMovie(values.searchName));
      } else {
        dispatch(searchActions.searchTV(values.searchName));
      }
    }, 500);

    return () => {
      console.log(`timerid ${timerId} is cleared!`);
      clearTimeout(timerId);
    };
  }, [dispatch, modeIndex, values.searchName]);

  return (
    <Input
      placeholder={commonDictionaries.titleName}
      name="searchName"
      value={values.searchName}
      onChange={handleChange}
      focusBorderColor="purple.400"
      boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
      borderRadius="20px"
    />
  );
};
