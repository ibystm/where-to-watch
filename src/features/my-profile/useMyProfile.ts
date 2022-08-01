import { collection, doc, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { collectionList } from "../../db/constants/index";
import db from "../../db/index";
import { useSelector } from "../../store";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";

type AccountInfoState = {
  value: FirestoreUser | null;
  loading: boolean;
  error: any;
};

// 一旦固定ID
const USER_ID = "T4OYfwSi8uvbXN9BjJRO";

const usersRef = collection(db, collectionList.users);

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
    const data = document?.data();
    if (userId === null || !data) return;
    setAccountData((pre) => ({
      ...pre,
      value: data,
    }));
  }, [userId, document]);

  console.log({ doc: accountData });
  const res = {
    accountData,
    loading,
    error,
  };
  return res;
};
