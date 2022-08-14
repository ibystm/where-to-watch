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
  const { accountData, handleClickDeleteButton } = useAccountInfo();
  const { colorMode } = useColorMode();
  const { value } = accountData;
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Box
        w="60%"
        h="85%"
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
            <Button bg="red" onClick={handleClickDeleteButton}>
              アカウントを削除
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
