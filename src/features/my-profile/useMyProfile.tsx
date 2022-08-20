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
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { delteFirestoreUser } from "../../db/firestore/users";
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

const MODAL_STATE = {
  CONFIRM: "CONFIRM",
  COMPLETE: "COMPLETE",
} as const;
type ModalState = typeof MODAL_STATE.CONFIRM | typeof MODAL_STATE.COMPLETE;

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
  const [modalState, setModalState] = useState<ModalState>("CONFIRM");

  const handleDeleteUser = async (password: string): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null || email === null) {
      onClose();
      alert("ユーザーが見つかりません。");
      return;
    }

    const credential = EmailAuthProvider.credential(email, password);
    startLoading();
    const reauthResult = await reauthenticateWithCredential(
      user,
      credential
    ).catch((e) => {
      console.log({ e });
    });
    if (!reauthResult) {
      return;
    }
    await deleteUser(user).catch((e) => {
      // エラハンTODO
      console.error(e);
    });
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
  useEffect(() => {
    if (!isOpen) {
      setModalState("CONFIRM");
    }
  }, [isOpen]);

  const handleClickBack = () => navigate(-1);

  const handleOpenModal = (): void => {
    reset();
    onOpen();
  };
  const submitHandler: SubmitHandler<FormValue> = async ({
    password,
  }): Promise<void> => {
    // await handleDeleteUser(password);
    if (id) {
      await delteFirestoreUser(id);
    }
    setModalState("COMPLETE");
    reset();
    navigate("/");
  };
  const delteConfirmModal = (): JSX.Element => (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalCloseButton />
          <ModalHeader>アカウントの削除</ModalHeader>
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
              disabled={watchPassword.length === 0}
            >
              アカウントを削除
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
  const delteCompleteModal = (): JSX.Element => (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>確認</ModalHeader>
        <ModalBody>
          <Box p="4">アカウントを削除しました。</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  const renderModal = (): JSX.Element => {
    if (modalState === "CONFIRM") {
      return delteConfirmModal();
    } else {
      return delteCompleteModal();
    }
  };

  const res = {
    accountData,
    handleClickBack,
    renderModal,
    handleOpenModal,
  };
  return res;
};
