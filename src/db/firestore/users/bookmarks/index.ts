import {
  deleteDoc,
  doc,
  DocumentReference,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import db from "../../..";
import {
  BookMark,
  FirestoreTypesBookMark,
} from "../../../../types/db/firestoreTypesBookMarks";
import { collectionList } from "../../../constants/collectionList";

export const addBookMark = async (userId: string, param: BookMark) => {
  const docRef = doc(
    db,
    collectionList.users,
    userId,
    collectionList.bookmarks,
    String(param.tmdbId)
  ) as DocumentReference<FirestoreTypesBookMark>;
  const now = Timestamp.fromDate(new Date());
  const newDoc = {
    ...param,
    createdAt: now,
    updatedAt: now,
  } as FirestoreTypesBookMark;
  try {
    await setDoc<FirestoreTypesBookMark>(docRef, newDoc);
  } catch (e) {
    throw e;
  }
};

export const deleteBookMark = async (
  userId: string,
  docId: number
): Promise<void> => {
  const docRef = doc(
    db,
    collectionList.users,
    userId,
    collectionList.bookmarks,
    String(docId)
  ) as DocumentReference<FirestoreTypesBookMark>;
  try {
    await deleteDoc(docRef);
  } catch (e) {
    throw e;
  }
};
