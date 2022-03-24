import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
        h="80px"
        marginX="48px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => navigate("/signup")}
          backgroundColor="white"
          height="70%"
        >
          <Heading size="xl">Can I watch ?</Heading>
        </Button>
        <Flex
          minW="400px"
          boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
        >
          <GlobalSearchBox />
        </Flex>
        <Button
          // colorScheme="purple"
          variant="outline"
          boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
          onClick={onPressButton}
          color="purple.500"
        >
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};
