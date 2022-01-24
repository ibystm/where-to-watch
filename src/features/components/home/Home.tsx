import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { selectUser } from "../../../store/slices/usersSlice";
import { useSelector } from "../../../store/store";
import { useSignOut } from "../../hooks/useSignOut";

export const Home: React.VFC = () => {
  const user = useSelector(selectUser);
  const { signOut } = useSignOut();
  const handleSubmit = async () => {
    signOut().catch((e) => {
      console.log(e);
    });
  };
  return (
    <VStack justify="center" align="center" mt="160px">
      <Box p={2}>
        <Text fontSize="xl">ユーザー情報</Text>
      </Box>
      <Box>
        <Box display="flex" p={2}>
          <Text fontSize="xl" mr="8px">
            Email:
          </Text>
          <Text fontSize="xl">{user.email}</Text>
        </Box>
        <Box display="flex" p={2}>
          <Text fontSize="xl" mr="8px">
            userName
          </Text>
          <Text fontSize="xl">
            {user.userName ? user.userName : "ユーザーネームなし"}
          </Text>
        </Box>
        <Box textAlign="center" marginTop="16px">
          <Button
            p="24px"
            fontSize="large"
            borderRadius="8px"
            colorScheme="purple"
            width="full"
            onClick={handleSubmit}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};
