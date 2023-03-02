import { useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHotKeys } from "../../../../hooks/useHotkeys";
import { actions, useSelector } from "../../../../store";
import { ModeType } from "../../../../types/redux/contentsMode";

export type SearchMovieFormValues = {
  searchName: string;
};
const initialValues: SearchMovieFormValues = {
  searchName: "",
};

export const useSearchMoviesByKeyword = (): typeof result => {
  const dispatch = useDispatch();
  const { searchMovie, searchTV } = actions;
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
  const keyword = useSelector((s) => s.searchContents.keyword);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useHotKeys("k", onOpen, true);

  const navigate = useNavigate();

  const getInitialValue = (): SearchMovieFormValues => {
    if (keyword.length === 0) return initialValues;
    return {
      searchName: keyword,
    };
  };

  const handleSubmit = (values: SearchMovieFormValues): void => {
    if (values.searchName.length === 0) {
      return;
    }

    if (modeIndex === ModeType.Movie) {
      dispatch(searchMovie({ keyword: values.searchName }));
    } else {
      dispatch(searchTV({ keyword: values.searchName }));
    }
    onClose();
    // どこの画面からでも、検索ワードを入力して検索を実行できるようにするため、検索実行時にかならず一覧画面へ戻す
    navigate("/");
  };

  const result = {
    handleSubmit,
    isOpen,
    onOpen,
    onClose,
    getInitialValue,
  };

  return result;
};
