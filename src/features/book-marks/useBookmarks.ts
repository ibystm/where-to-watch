import { useEffect, useState } from "react";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useSelector } from "../../store";
import { FirestoreTypesBookMark } from "../../types/db/firestoreTypesBookMarks";
import { getDocs } from "../../utils/firebase/firestore/documentsHelper";
export const useBookmark = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const [bookmarkList, setBookmarkList] = useState<FirestoreTypesBookMark[]>(
    []
  );

  useEffect(() => {
    if (userId === null) return;
    getDocs(collectionReferences.bookmarks(userId)).then((data) => {
      if (!data) {
        return;
      }
      setBookmarkList(data);
    });
  }, [userId]);

  const result = {
    bookmarkList,
  };

  return result;
};
