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
import { SubmitHandler, useForm } from "react-hook-form";
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

type FormValue = {
  password: string;
};

// https://react-hook-form.com/jp/
// 遊びでこのページだけreact-hook-form使ってみる。
export const useAccountInfo = (): typeof res => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit, register, reset, watch } = useForm<FormValue>({
    defaultValues: {
      password: "",
    },
  });
  const watchPassword = watch("password");
  const { startLoading, endLoading } = useActions(actions);
  const { id, email } = useSelector((s) => s.user);

  const [accountData, setAccountData] = useState<AccountInfoState>({
    value: null,
    loading: false,
    error: null,
  });
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
    const credential = EmailAuthProvider.credential(email, "");
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
    reset();
    onOpen();
  };
  const submitHandler: SubmitHandler<FormValue> = (data) => {
    console.log({ data });
    reset();
  };
  const delteUserConfirmModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalCloseButton />
          <ModalHeader>アカウントを削除</ModalHeader>
          <ModalBody>
            <Box p="2">
              <Text>
                アカウントを削除すると、ユーザー情報が完全に削除されます。
              </Text>
              <Text pt="2">
                削除するには、ログインパスワードを入力してください。
              </Text>
              <Box pt="4">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="ログインパスワード"
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="red"
              // onClick={handleClickDeleteButton}
              disabled={watchPassword.length === 0}
            >
              アカウントを削除
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  const res = {
    accountData,
    handleClickBack,
    delteUserConfirmModal,
    handleOpenModal,
  };
  return res;
};
