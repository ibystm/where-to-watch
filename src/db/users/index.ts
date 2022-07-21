import { addDoc, collection } from "firebase/firestore";
import db from "..";
import { BasicUserData } from "../../types/db/firestoreTypesUsers";
import { collectionList } from "../constants/index";

type AddUserData = Omit<BasicUserData, "deleted">;

export const addFirestoreUser = async (params: AddUserData) => {
  try {
    await addDoc(collection(db, collectionList.users), {
      ...params,
      deleted: false,
    });
  } catch (e) {
    console.error(e);
  }
};
