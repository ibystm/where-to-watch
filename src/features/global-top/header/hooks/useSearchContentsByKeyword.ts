import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeType } from "../../../../types/redux/contentsMode";

export type SearchMovieFormValues = {
  searchName: string;
};

export const useSearchMoviesByKeyword = (): typeof result => {
  const dispatch = useDispatch();
  const { searchMovie, searchTV } = actions;
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handler = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.metaKey && ev.key === "k") {
        onOpen();
      }
    },
    [onOpen]
  );
  useEffect(() => {
    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [handler]);

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
  };

  const result = {
    handleSubmit,
    isOpen,
    onOpen,
    onClose,
  };

  return result;
};
