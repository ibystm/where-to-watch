import { useEffect, useState } from "react";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useSelector } from "../../store";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";
import { getDocs } from "../../utils/firebase/firestore/documentsHelper";

type AccountInfoState = {
  value: FirestoreUser | null;
  loading: boolean;
  error: any;
};

export const useAccountInfo = (): typeof res => {
  const userId = useSelector((s) => s.user.id);
  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (userId === null) return;
    getDocs(collectionReferences.users)
      .then((docs) => {
        const doc = docs.find((d) => d.userId === userId);
        if (typeof doc === "undefined") return;
        setAccountData((pre) => ({
          ...pre,
          value: doc,
        }));
      })
      .catch((e) => {
        setAccountData((pre) => ({
          ...pre,
          error: e,
        }));
      });
  }, [userId]);

  const res = {
    accountData,
  };
  return res;
};
