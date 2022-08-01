import { DocumentData, QuerySnapshot } from "firebase/firestore";

/** Firestoreのquery Snap Shotから、Documentsデータを抽出する */
export const extractFirestoreDocsFromQS = <T = DocumentData>(
  snapshotDocs: QuerySnapshot<T>
): T[] => {
  return snapshotDocs.docs.map((d) => {
    return d.data();
  });
};
