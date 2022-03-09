import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useSwitchAuthButton } from "./hooks/useSwitchAuthButton";
import { GlobalSearchBox } from "./searchBox";

export const Header: React.VFC = () => {
  const { buttonText, onPressButton } = useSwitchAuthButton();

  return (
    <Box
      w="100%"
      borderBottom="1px"
      boxShadow="md"
      borderColor="purple.100"
      mb="24px"
    >
      <Flex
        h="64px"
        marginX="48px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading size="xl">Can I watch ?</Heading>
        </Box>
        <Flex minW="400px">
          <GlobalSearchBox />
        </Flex>
        <Button colorScheme="purple" variant="outline" onClick={onPressButton}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};
