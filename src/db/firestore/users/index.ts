import { doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../..";
import { BasicUserData } from "../../../types/db/firestoreTypesUsers";
import { collectionList } from "../../constants/collectionList";

type AddUserData = Omit<BasicUserData, "deleted">;

export const addFirestoreUser = async (params: AddUserData) => {
  try {
    await setDoc(doc(db, collectionList.users, params.userId), {
      ...params,
      deleted: false,
    });
  } catch (e) {
    throw e;
  }
};

export const delteFirestoreUser = async (userId: string) => {
  const targetUserRef = doc(db, collectionList.users, userId);
  try {
    await updateDoc(targetUserRef, {
      deleted: true,
    });
  } catch (e) {
    throw e;
  }
};
