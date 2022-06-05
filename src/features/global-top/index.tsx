import { VStack } from "@chakra-ui/react";
import React from "react";
import { Header } from "./header";

interface P {
  shouldShowheader: boolean;
}

export const GlobalTop: React.FC<P> = ({ children, shouldShowheader }) => {
  return (
    <VStack width="100wh" height="100vh">
      {shouldShowheader && <Header />}
      {children}
    </VStack>
  );
};
