import { Box, Text } from "@chakra-ui/react";
import React from "react";

type P = {
  message: string;
};

export const ErrorMessage: React.FC<P> = (props) => {
  const { message } = props;
  return (
    <Box>
      <Text color="red" fontSize="14px" textAlign="right" mr="2">
        {`エラー: ${message}`}
      </Text>
    </Box>
  );
};
