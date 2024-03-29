import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collectionReferences } from "../../../db/constants/collectionReferences";
import {
  addBookMark as addBookMarkToFirestore,
  deleteBookMark as deleteBookMarkFromFirestore,
} from "../../../db/firestore/users/bookmarks";
import { useSelector } from "../../../store";
import { BookMark } from "../../../types/db/firestoreTypesBookMarks";
import { getDocs } from "../../../utils/firebase/firestore/documentsHelper";

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

export const useContentDeteilModal = (tmdbId: number): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const toast = useToast();
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  const addBookMark = async (param: Param) => {
    if (userId === null) return;
    await addBookMarkToFirestore(userId, {
      modeIndex,
      ...param,
    });
    toast(toastOption);
  };

  const deleteBookMark = async (tmdbId: number): Promise<void> => {
    if (userId === null) return;
    await deleteBookMarkFromFirestore(userId, tmdbId);
  };

  useEffect(() => {
    if (userId === null) return;
    getDocs(collectionReferences.bookmarks(userId)).then(async (data) => {
      if (!data) {
        return;
      }
      const res = await Promise.all(data);
      setIsAlreadyBookmarked(!!res.find((r) => r.tmdbId === tmdbId));
    });
  }, [userId, tmdbId]);

  const result = {
    addBookMark,
    deleteBookMark,
    isAlreadyBookmarked,
  };
  return result;
};
