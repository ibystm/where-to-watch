import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useSwitchAuthButton } from "./hooks/useSwitchAuthButton";

export const Header: React.VFC = () => {
  const { buttonText, onPressButton } = useSwitchAuthButton();
  return (
    <Box
      w="100%"
      borderBottom="1px"
      height="75px"
      boxShadow="md"
      borderColor="purple.100"
    >
      <Flex
        h="100%"
        marginX="48px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading size="xl">Can I watch ?</Heading>
        </Box>
        <Button colorScheme="purple" variant="outline" onClick={onPressButton}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};
