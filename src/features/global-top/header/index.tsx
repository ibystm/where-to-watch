import { Box, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DropDownMenu } from "../dropdown-menu";
import { ChoiceTabs } from "./choices/index";
import { DarkModeChangeButton } from "./dark-mode-change-button";
// import { useSwitchAuthButton } from "./hooks/useSwitchAuthButton";
import { GlobalSearchBox } from "./searchBox";

export const Header: React.FC = () => {
  // TODO
  // const { buttonText, onPressButton } = useSwitchAuthButton();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="100%" borderColor="purple.100" mb="2">
      <Flex
        h="100px"
        marginX="48px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          // TODO ユーザー管理できたら後で直す
          onClick={() => navigate("/")}
          backgroundColor="inherit"
          height="70%"
        >
          <Heading size="md">Where to watch.</Heading>
        </Button>
        <Flex maxW="400px" borderRadius="20px" flexGrow="1">
          <GlobalSearchBox />
        </Flex>
        {/* <Button // ログインを実装するか要検討
          colorScheme="purple"
          variant="outline"
          onClick={onPressButton}
          color="purple.500"
        >
          {buttonText}
        </Button> */}
        <Flex gap="4" marginInline="4">
          <ChoiceTabs />
          <DarkModeChangeButton />
        </Flex>
        <DropDownMenu />
      </Flex>
    </Box>
  );
};
