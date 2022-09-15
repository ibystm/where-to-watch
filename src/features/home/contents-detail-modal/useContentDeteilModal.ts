import { useToast } from "@chakra-ui/react";
import { addBookMark as addBookMarkToFirestore } from "../../../db/firestore/users/bookmarks";
import { useSelector } from "../../../store";
import { BookMark } from "../../../types/db/firestoreTypesBookMarks";

type Param = Omit<BookMark, "modeIndex">;

export const useContentDeteilModal = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const toast = useToast();

  const handleClickBookMark = async (param: Param) => {
    if (userId === null) return;
    await addBookMarkToFirestore(userId, {
      modeIndex,
      ...param,
    });
    toast({
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
    });
  };

  const result = {
    handleClickBookMark,
  };
  return result;
};
