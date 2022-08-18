import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteUser, EmailAuthProvider, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useActions } from "../../hooks/useActions";
import { actions, useSelector } from "../../store";
import { FirestoreUser } from "../../types/db/firestoreTypesUsers";
import { getDocs } from "../../utils/firebase/firestore/documentsHelper";

type AccountInfoState = {
  value: FirestoreUser | null;
  loading: boolean;
  error: any;
};

// https://react-hook-form.com/jp/
// 遊びでこのページだけreact-hook-form使ってみる。
export const useAccountInfo = (): typeof res => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { startLoading, endLoading } = useActions(actions);
  const { id, email } = useSelector((s) => s.user);

  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });
  const [checkedList, setCheckedList] = useState({
    first: false,
  });
  const [password, setPassword] = useState("");
  const handleClickDeleteButton = async (): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null || email === null) {
      onClose();
      alert("ユーザーが見つかりません。");
      return;
    }

    startLoading();

    // TODO
    const credential = EmailAuthProvider.credential(email, password);
    // reauthenticateWithCredential
    await deleteUser(user)
      .then((res) => {
        // TODO
        // モーダルを表示
      })
      .catch((e) => {
        // エラハンTODO
        console.error(e);
      });
    onClose();
    endLoading();
  };

  useEffect(() => {
    if (id === null) return;
    getDocs(collectionReferences.users)
      .then((docs) => {
        const doc = docs.find((d) => d.userId === id);
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
  }, [id]);

  const handleClickBack = () => navigate(-1);

  const handleOpenModal = (): void => {
    setCheckedList((cur) => ({
      first: false,
    }));
    onOpen();
  };
  const delteUserConfirmModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>アカウントを削除</ModalHeader>
        <ModalBody>
          <Box p="2">
            <Text>
              アカウントを削除すると、ユーザー情報が完全に削除されます。
            </Text>
            <Text pt="2">削除するにはパスワードを入力してください。</Text>
            <Box pt="4">
              <form>
                <Input
                  type="password"
                  placeholder="ログインパスワード"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </form>
            </Box>
            {/* <Checkbox>登録したブックマークは完全に削除されます</Checkbox> */}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="red"
            onClick={handleClickDeleteButton}
            disabled={password.length === 0}
          >
            アカウントを削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const res = {
    accountData,
    handleClickDeleteButton,
    handleClickBack,
    delteUserConfirmModal,
    handleOpenModal,
  };
  return res;
};
