import { Text } from "@chakra-ui/react";
import React from "react";

type P = {
  message: string;
};

export const ErrorMessage: React.VFC<P> = (props) => {
  const { message } = props;
  return (
    <Text color="red" fontSize="12px" textAlign="right" mt="4px" mr="8px">
      {message}
    </Text>
  );
};
