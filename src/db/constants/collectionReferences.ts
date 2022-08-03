import { collection, CollectionReference } from "firebase/firestore";
import db from "..";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";
import { collectionList } from "./collectionList";

const usersRef = collection(
  db,
  collectionList.users
) as CollectionReference<FirestoreUser>;

const hideHeaderPathsRef = collection(db, collectionList.hideHeaderPaths);

export const collectionReferences = {
  users: usersRef,
  hideHeaderPaths: hideHeaderPathsRef,
} as const;
