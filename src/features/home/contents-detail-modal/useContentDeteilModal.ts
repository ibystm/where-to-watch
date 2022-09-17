import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addBookMark as addBookMarkToFirestore } from "../../../db/firestore/users/bookmarks";
import { useSelector } from "../../../store";
import { BookMark } from "../../../types/db/firestoreTypesBookMarks";

type Param = Omit<BookMark, "modeIndex">;

const toastOption: UseToastOptions = {
  // Added to your bookmark!
  title: "ブックマークに追加しました！",
  duration: 5000,
  isClosable: true,
  status: "success",
  position: "top",
  containerStyle: {
    width: "300px",
    maxWidth: "500px",
  },
};

export const useContentDeteilModal = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const toast = useToast();
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  const handleClickBookMark = async (param: Param) => {
    if (userId === null) return;
    await addBookMarkToFirestore(userId, {
      modeIndex,
      ...param,
    });
    toast(toastOption);
  };

  useEffect(() => {
    // TODO
    // FirestoreからbookmarkのDocsを取得して、すでに登録済みのBookmarkであるかの状態を管理
  }, []);

  const result = {
    handleClickBookMark,
    isAlreadyBookmarked,
  };
  return result;
};
