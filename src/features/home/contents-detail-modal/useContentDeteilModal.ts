import { addBookMark as addBookMarkToFirestore } from "../../../db/firestore/users/bookmarks";
import { useSelector } from "../../../store";
import { BookMark } from "../../../types/db/firestoreTypesBookMarks";

type Param = Omit<BookMark, "modeIndex">;

export const useContentDeteilModal = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);

  const handleClickBookMark = async (param: Param) => {
    if (userId === null) return;
    await addBookMarkToFirestore(userId, {
      modeIndex,
      ...param,
    });
  };

  const result = {
    handleClickBookMark,
  };
  return result;
};
