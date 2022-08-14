import { deleteUser, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const userId = useSelector((s) => s.user.id);
  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });
  const handleClickDeleteButton = async (): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null) {
      alert("ユーザーが見つかりません。");
      return;
    }
    deleteUser(user)
      .then((res) => {
        // TODO
        // モーダルを表示
      })
      .catch((e) => {
        // エラハンTODO
        console.error(e);
      });
  };

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

  const handleClickBack = () => navigate(-1);

  const res = {
    accountData,
    handleClickDeleteButton,
    handleClickBack,
  };
  return res;
};
