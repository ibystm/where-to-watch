import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { collectionList } from "../../db/constants/index";
import db from "../../db/index";
import { useSelector } from "../../store";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";
import { extractFirestoreDocsFromQS } from "../../utils/firebase/extractFirestoreDocsFromSnapshot";

type AccountInfoState = {
  value: FirestoreUser | null;
  loading: boolean;
  error: any;
};

// 一旦固定ID
const USER_ID = "T4OYfwSi8uvbXN9BjJRO";

const usersRef = collection(
  db,
  collectionList.users
) as CollectionReference<FirestoreUser>;

export const useAccountInfo = (): typeof res => {
  const userId = useSelector((s) => s.user.id);
  const [document, loading, error] = useDocument<FirestoreUser>(
    doc(usersRef, USER_ID) as DocumentReference<FirestoreUser>
  );
  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // getDocsをラップしていい感じにできそう・・・
    if (userId === null) return;
    getDocs<FirestoreUser>(usersRef)
      .then(extractFirestoreDocsFromQS)
      .then((docs) => {
        const doc = docs.find((d) => d.userId === userId);
        if (typeof doc === "undefined") return;
        setAccountData((pre) => ({
          ...pre,
          value: doc,
        }));
      });
  }, [userId, document]);

  const res = {
    accountData,
    loading,
    error,
  };
  return res;
};
