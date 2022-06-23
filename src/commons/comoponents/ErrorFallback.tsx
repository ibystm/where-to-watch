import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Flex
      role="alert"
      justifyContent="center"
      align="center"
      w="100vw"
      h="100vh"
    >
      <Box>
        <Heading p="4">Sorry... Something went wrong.</Heading>
        <Text p="2" fontSize="xl" textAlign="center">
          {error.message}
        </Text>
        <Flex justifyContent="center" align="center" p="4">
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Flex>
      </Box>
    </Flex>
  );
};
