import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChoiceTabs } from "./choices/index";
import { useSwitchAuthButton } from "./hooks/useSwitchAuthButton";
import { GlobalSearchBox } from "./searchBox";

export const Header: React.VFC = () => {
  const { buttonText, onPressButton } = useSwitchAuthButton();
  const navigate = useNavigate();

  return (
    <Box
      w="100%"
      boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
      borderColor="purple.100"
      mb="8px"
    >
      <Flex
        h="100px"
        marginX="48px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => navigate("/signup")}
          backgroundColor="white"
          height="70%"
        >
          <Heading size="lg">Where to watch ?</Heading>
        </Button>
        <Flex
          minW="400px"
          boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
        >
          <GlobalSearchBox />
        </Flex>
        {/* <Button // ログインを実装するか要検討
          colorScheme="purple"
          variant="outline"
          boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
          onClick={onPressButton}
          color="purple.500"
        >
          {buttonText}
        </Button> */}
        <ChoiceTabs />
      </Flex>
    </Box>
  );
};