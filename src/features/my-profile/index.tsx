import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useAccountInfo } from "./useMyProfile";

export const MyProfile: React.FC = () => {
  const { accountData, handleClickBack, delteUserConfirmModal, onOpen } =
    useAccountInfo();
  const { colorMode } = useColorMode();
  const { value } = accountData;
  return (
    <>
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          w="60%"
          h="80%"
          borderRadius="20px"
          boxShadow="lg"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={colorMode === "dark" ? "gray.600" : undefined}
        >
          <Heading size="lg" p="8">
            アカウント情報
          </Heading>
          <Box p="8">
            <Flex p="4" gap="96px">
              <Text fontWeight="bold">ユーザーネーム</Text>
              <Text fontWeight="bold">{value?.name ?? "なし"}</Text>
            </Flex>
            <Flex p="4" gap="96px">
              <Text fontWeight="bold">メールアドレス</Text>
              <Text fontWeight="bold">{value?.email ?? "なし"}</Text>
            </Flex>
            <Flex p="4" gap="96px">
              <Text fontWeight="bold">アカウント登録日</Text>
              <Text fontWeight="bold">{value?.createdAt ?? "不明"}</Text>
            </Flex>
            <Flex p="10" justifyContent="center">
              <Button colorScheme="red" onClick={onOpen}>
                アカウントを削除
              </Button>
            </Flex>
          </Box>
        </Box>
        <Box p="6">
          <Button onClick={handleClickBack} colorScheme="purple">
            Go back
          </Button>
        </Box>
      </Flex>
      {delteUserConfirmModal()}
    </>
  );
};
