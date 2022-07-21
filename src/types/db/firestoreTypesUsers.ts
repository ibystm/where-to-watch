import { FirestoreTypesCommon } from "./firestoreTypesCommon";

export type BasicUserData = {
  userId: string;
  email: string;
  name: string;
  deleted: boolean;
};

export type FirestoreUser = BasicUserData & FirestoreTypesCommon;
