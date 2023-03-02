import {
  CollectionReference,
  DocumentData,
  getDocs as getFirestoreDocs,
} from "firebase/firestore";

export const getDocs = async <T = DocumentData>(
  collectionRef: CollectionReference<T>
): Promise<T[]> => {
  const querySnapshot = await getFirestoreDocs(collectionRef);
  const data = querySnapshot.docs.map((d) => d.data());
  return data;
};
