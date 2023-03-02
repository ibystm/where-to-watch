import { Timestamp } from "firebase/firestore";

export type FirestoreTypesCommon = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
};
