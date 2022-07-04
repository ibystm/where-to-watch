import { Box, Spinner as ChakraSpinner, SpinnerProps } from "@chakra-ui/react";

interface P extends SpinnerProps {
  masked?: boolean;
}

export const Spinner: React.FC<P> = (props) => {
  const { masked, ...rest } = props;
  return masked ? (
    <Box
      h="100vh"
      w="100vw"
      zIndex="modal"
      backgroundColor="gray.100"
      opacity="0.6"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      <ChakraSpinner
        {...rest}
        size="xl"
        colorScheme="purple"
        thickness="3px"
        position="absolute"
        left="50%"
        top="50%"
      />
    </Box>
  ) : (
    <ChakraSpinner {...rest} />
  );
};
