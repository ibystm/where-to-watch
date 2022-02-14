import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
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
        <Box minW="400px">
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<SearchIcon color="purple.500" />}
            />
            <Input type="search" placeholder="Movie Name" borderRadius="20px" />
          </InputGroup>
        </Box>
        <Button colorScheme="purple" variant="outline" onClick={onPressButton}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};
