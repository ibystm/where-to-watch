import { collection, CollectionReference } from "firebase/firestore";
import db from "..";
import { FirestoreTypesBookMark } from "../../types/db/firestoreTypesBookMarks";
import { FirestoreTypesHideHeaderPaths } from "../../types/db/firestoreTypesHideHeaderPaths";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";
import { collectionList } from "./collectionList";

const usersRef = collection(
  db,
  collectionList.users
) as CollectionReference<FirestoreUser>;

const hideHeaderPathsRef = collection(
  db,
  collectionList.hideHeaderPaths
) as CollectionReference<FirestoreTypesHideHeaderPaths>;

const bookmarksRef = (id: string) =>
  collection(
    db,
    collectionList.users,
    id,
    collectionList.bookmarks
  ) as CollectionReference<FirestoreTypesBookMark>;

export const collectionReferences = {
  users: usersRef,
  hideHeaderPaths: hideHeaderPathsRef,
  bookmarks: bookmarksRef,
} as const;
