import { VStack } from "@chakra-ui/react";
import React from "react";
import { Header } from "./header/Header";

export const GlobalTop: React.FC = ({ children }) => {
  return (
    <VStack width="100wh" height="100vh">
      <Header />
      {children}
    </VStack>
  );
};
