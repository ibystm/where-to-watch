import { collection, CollectionReference } from "firebase/firestore";
import { collectionList } from ".";
import db from "..";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";

const usersRef = collection(
  db,
  collectionList.users
) as CollectionReference<FirestoreUser>;

export const collectionReferences = {
  users: usersRef,
} as const;
