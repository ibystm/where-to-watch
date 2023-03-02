import {
  doc,
  DocumentReference,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../..";
import {
  BasicUserData,
  FirestoreUser,
} from "../../../types/db/firestoreTypesUsers";
import { collectionList } from "../../constants/collectionList";

type AddUserData = Omit<BasicUserData, "deleted">;

export const addFirestoreUser = async (params: AddUserData) => {
  const docRef = doc(
    db,
    collectionList.users,
    params.userId
  ) as DocumentReference<FirestoreUser>;
  const now = Timestamp.fromDate(new Date());
  try {
    await setDoc<FirestoreUser>(docRef, {
      ...params,
      deleted: false,
      createdAt: now,
      updatedAt: now,
    });
  } catch (e) {
    throw e;
  }
};

export const delteFirestoreUser = async (userId: string) => {
  const docRef = doc(
    db,
    collectionList.users,
    userId
  ) as DocumentReference<FirestoreUser>;
  const now = Timestamp.fromDate(new Date());
  try {
    await updateDoc<FirestoreUser>(docRef, {
      deleted: true,
      updatedAt: now,
      deletedAt: now,
    });
  } catch (e) {
    throw e;
  }
};
