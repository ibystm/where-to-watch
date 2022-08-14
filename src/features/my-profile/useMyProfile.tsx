import {
  Box,
  Button,
  Checkbox,
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const userId = useSelector((s) => s.user.id);
  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });
  const [checkedList, setCheckedList] = useState({
    first: false,
  });
  const handleClickDeleteButton = async (): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null) {
      onClose();
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
          <Box>
            <Text p="6">
              アカウントを削除すると、次に同意したことになります。
            </Text>
            <Checkbox
              checked={checkedList.first}
              onChange={() =>
                setCheckedList((cur) => ({ ...cur, first: !cur.first }))
              }
            >
              ユーザー情報は完全に削除されます
            </Checkbox>
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
            disabled={!checkedList.first}
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
